import request from 'supertest';
import app from '../src/app';
import { JWT_SECRET } from '../src/util/decodeJwt';
import { mocked } from 'ts-jest/utils';
import { postUsers, getUsers } from '../src/application/users';
import jwt from 'jsonwebtoken';

jest.mock('../src/application/users', () => {
  return {
    postUsers: jest.fn().mockImplementation(() => {
      return new Promise((resolve) => resolve());
    }),
    getUsers: jest.fn().mockImplementation(() => {
      return new Promise((resolve) =>
        resolve([
          {
            id: 1,
            name: 'james kwok',
            email: 'james@james.com',
            meta: {
              isVerified: true,
              isExpired: false,
              addedOn: 'addedOn'
            }
          }
        ])
      );
    })
  };
});

const token = jwt.sign({ foo: 'bar' }, JWT_SECRET);

describe('GET /users', () => {
  const mockedGetUsers = mocked(getUsers, true);

  beforeEach(() => {
    mockedGetUsers.mockClear();
  });

  it('should return 401 when JWT not attached', async () => {
    await request(app).get('/users').expect(401);
    expect(mockedGetUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 404 when incorrect route used', async () => {
    await request(app)
      .get('/usersssssssss')
      .set('Authorization', 'Bearer ' + token)
      .expect(404);
    expect(mockedGetUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 200 with JWT', async () => {
    await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .expect([
        {
          id: 1,
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ]);
    expect(mockedGetUsers).toHaveBeenCalledTimes(1);
  });
});

describe('POST /users', () => {
  const mockedPostUsers = mocked(postUsers, true);

  beforeEach(() => {
    mockedPostUsers.mockClear();
  });

  it('should return 401 when JWT not attached', async () => {
    await request(app).post('/users').expect(401);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 201 with JWT', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(201);
    expect(mockedPostUsers).toHaveBeenCalledTimes(1);
  });

  it('should return 201 when isVerified is optional', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: '2@james.com',
          meta: {
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(201);
    expect(mockedPostUsers).toHaveBeenCalledTimes(1);
  });

  it('should return 201 when isExpired is optional', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(201);
    expect(mockedPostUsers).toHaveBeenCalledTimes(1);
  });

  it('should return 400 when empty name', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: '',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 400 when invalid email', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james@@@.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 400 when meta field is missing', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james.com'
        }
      ])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 400 when isVerified not boolean', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: 'true',
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 400 when isExpired not boolean', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            isExpired: 'false',
            addedOn: 'addedOn'
          }
        }
      ])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 400 when addedOn is an empty string', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([
        {
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: ''
          }
        }
      ])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });

  it('should return 400 when user creation list empty', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send([])
      .expect(400);
    expect(mockedPostUsers).toHaveBeenCalledTimes(0);
  });
});

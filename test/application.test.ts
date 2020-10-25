import { mocked } from 'ts-jest/utils';
import { postUsers } from '../src/application/users';
import { getEntityUsers, createEntityUsers } from '../src/infrastructure/datastoreUsers';

jest.mock('../src/infrastructure/datastoreUsers', () => {
  return {
    createEntityUsers: jest.fn().mockImplementation(() => {
      return new Promise((resolve) => resolve());
    }),
    getEntityUsers: jest.fn().mockImplementation(() => {
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

describe('POST /users', () => {
  const mockedGetEntityUsers = mocked(getEntityUsers, true);
  const mockedCreateEntityUsers = mocked(createEntityUsers, true);

  beforeEach(() => {
    mockedGetEntityUsers.mockClear();
    mockedCreateEntityUsers.mockClear();
  });

  it('should create with unique email', async () => {
    try {
      await postUsers([
        {
          name: 'mark mark',
          email: 'mark@mark.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ]);
    } finally {
      expect(mockedGetEntityUsers).toHaveBeenCalledTimes(1);
      expect(mockedCreateEntityUsers).toHaveBeenCalledTimes(1);
    }
  });

  it('should detect duplicate email', async () => {
    try {
      await postUsers([
        {
          name: 'james kwok',
          email: 'james@james.com',
          meta: {
            isVerified: true,
            isExpired: false,
            addedOn: 'addedOn'
          }
        }
      ]);
    } catch {
      expect(mockedGetEntityUsers).toHaveBeenCalledTimes(1);
      expect(mockedCreateEntityUsers).toHaveBeenCalledTimes(0);
    }
  });
});

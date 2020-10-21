import { mocked } from 'ts-jest/utils';
import { postUsers } from '../src/application/users';
import { getEntityUsers, postEntityUsers } from "../src/infrastructure/datastoreUsers"

jest.mock('../src/infrastructure/datastoreUsers', () => {
    return {
        postEntityUsers: jest.fn().mockImplementation(() => {
            return new Promise(resolve => resolve());
        }),
        getEntityUsers: jest.fn().mockImplementation(() => {
          return new Promise(resolve => resolve([{
              id: 1,
              name: "james kwok",
              email: "james@james.com",
              meta: {
                isVerified: true,
                isExpired: false,
                addedOn: "addedOn"
              }
           }]));
      })
    };
});

describe("GET /users", () => {
    const mockedGetEntityUsers = mocked(getEntityUsers, true);
    const mockedPostEntityUsers = mocked(postEntityUsers, true);

    beforeEach(() => {
      mockedGetEntityUsers.mockClear();
      mockedPostEntityUsers.mockClear();   
    });

    it("should create with unique email", async () => {
      try {
        await postUsers([{
            name: "mark mark",
            email: "mark@mark.com",
            meta: {
              isVerified: true,
              isExpired: false,
              addedOn: "addedOn"
            }
        }]);
      } finally {
        expect(mockedGetEntityUsers).toHaveBeenCalledTimes(1);
        expect(mockedPostEntityUsers).toHaveBeenCalledTimes(1);
      }
    });

    it("should detect duplicate email", async () => {
      try {
        await postUsers([{
            name: "james kwok",
            email: "james@james.com",
            meta: {
              isVerified: true,
              isExpired: false,
              addedOn: "addedOn"
            }
        }]);
      } catch {
        expect(mockedGetEntityUsers).toHaveBeenCalledTimes(1);
        expect(mockedPostEntityUsers).toHaveBeenCalledTimes(0);
      }
    });
});

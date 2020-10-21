import { UserEntity } from './Entities/User';
let inMemoryDatabase: UserEntity[] = [];

// Database simulator, can be replaced with sequelize in the future. Using promise as sequelize calls will be promises.
// If NoSQL is preferred then Mongoose can be used for mongo.
export const getEntityUsers = (): Promise<UserEntity[]> => {
  return new Promise((resolve) => resolve(inMemoryDatabase));
};

export const createEntityUsers = (users: UserEntity[]): Promise<void> => {
  return new Promise((resolve) => {
    const ids = inMemoryDatabase.map((user) => user.id).concat(0); // Ids of an empty set should start at 1
    const maxId = Math.max(...ids);
    let id = maxId;

    // Increment Id for each new user.
    users.forEach((u) => {
      id = id + 1;
      u.id = id;
    });

    inMemoryDatabase = inMemoryDatabase.concat(users);
    return resolve();
  });
};

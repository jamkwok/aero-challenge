"use strict";

import { UserEntity } from '../infrastructure/Entities/User';
import { getEntityUsers, createEntityUsers } from '../infrastructure/datastoreUsers';
import { BadRequestException } from '../util/errors';
import logger from '../util/logger';
import { NewUser } from './models/NewUser';
import { User } from './models/User';

export const getUsers = async (): Promise<User[]> => {
  const entityUsers = await getEntityUsers();
  return entityUsers.map((user) => {
    return <User>{
      id: user.id,
      name: user.name,
      email: user.email,
      meta: {
        isVerified: user.meta.isVerified,
        isExpired: user.meta.isExpired,
        addedOn: user.meta.addedOn
      }
    };
  });
};

export const postUsers = async (users: NewUser[]): Promise<void> => {
  // need to check for email uniqueness in both request and any existing in the datastore.
  const entityUsers = await getEntityUsers();

  const existingEmails = entityUsers.map((user) => user.email);
  const newEmails = users.map((user) => user.email);
  const totalEmails = existingEmails.concat(newEmails);
  const totalUniqueEmails = [...new Set(totalEmails)];

  if (totalUniqueEmails < totalEmails) {
    logger.error('error emails not unique');
    throw new BadRequestException('emails not unique');
  }

  await createEntityUsers(
    users.map((user) => {
      return <UserEntity>{
        name: user.name,
        email: user.email,
        meta: {
          isVerified: user.meta.isVerified,
          isExpired: user.meta.isExpired,
          addedOn: user.meta.addedOn
        }
      };
    })
  );
};

"use strict";

import { Request, Response, NextFunction } from 'express';
import decodeJwt from '../util/decodeJwt';

import express from 'express';
import { getUsers, postUsers } from '../application/users';
import logger from '../util/logger';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../util/errors';
import { NewUser } from '../application/models/NewUser';
import { postUsersValidation } from './validation/usersValidation';

const router = express.Router();

router.get(
  '/users',
  decodeJwt,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await getUsers();
      return res.json(users);
    } catch (err) {
      logger.error('error', err);
      return next(err);
    }
  }
);

router.post(
  '/users',
  decodeJwt,
  postUsersValidation,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error('error', errors.array());
        throw new BadRequestException('Incorrect request body');
      }
      await postUsers(req.body as NewUser[]);
      return res.status(201).json({ status: 'created' });
    } catch (err) {
      logger.error('error', err);
      return next(err);
    }
  }
);

export default router;

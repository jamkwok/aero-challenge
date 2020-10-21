import jwt from 'express-jwt';
import logger from './logger';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const JWT_SECRET = process.env['JWT_SECRET'];
if (!JWT_SECRET) {
  logger.error('No secret. Set JWT_SECRET environment variable.');
  process.exit(1);
}

const decodeJwt = jwt({ secret: JWT_SECRET, algorithms: ['HS256'] });
export default decodeJwt;

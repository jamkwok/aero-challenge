import { body } from 'express-validator';
export const postUsersValidation = [
    body().isArray().notEmpty(),
    body('*.name', 'name must be a string')
      .exists()
      .notEmpty()
      .isString()
      .trim()
      .escape(), // Sanitization
    body('*.email', 'email field must be an email').exists().trim().isEmail().normalizeEmail(),
    body('*.meta.isVerified', 'meta.isVerified field must be boolean').custom((value) => {
      // .optional({falsey: true}) typescript bug
      if (value === undefined || typeof value === 'boolean') return true;
      throw new Error('isVerified must be boolean when set');
    }),
    body('*.meta.isExpired', 'meta.isExpired field must be boolean').custom((value) => {
      if (value === undefined || typeof value === 'boolean') return true;
      throw new Error('isExpired must be boolean when set');
    }),
    body('*.meta.addedOn', 'meta.addedOn field must be a string')
      .exists()
      .notEmpty()
      .isString()
      .trim()
      .escape() // Sanitization
  ];
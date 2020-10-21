import { Request, Response, NextFunction } from "express";
import decodeJwt from "../util/decodeJwt"

import express from "express";
import { getUsers, postUsers } from "../application/users";
import logger from "../util/logger";
import { body, validationResult } from "express-validator";
import { BadRequestException } from "../util/errors";
import { NewUser } from "../application/models/NewUser";

const router = express.Router();

router.get("/users", decodeJwt, async (req : Request, res: Response, next: NextFunction): Promise<any> => {
    
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (err) {
        logger.error("error", err);
        return next(err);
    }

});

router.post("/users", decodeJwt, [
    body().isArray(),
    body('*.name', 'name must be a string').exists().notEmpty().isString().trim().escape(), // Sanitization
    body('*.email', 'email field must be an email').exists().isEmail().normalizeEmail(),
    body('*.meta.isVerified', 'meta.isVerified field must be boolean').custom((value) => {
        // .optional({falsey: true}) typescript bug
        if (value === undefined || typeof value === "boolean") return true;
        throw new Error('isVerified must be boolean when set');
    }),
    body('*.meta.isExpired', 'meta.isExpired field must be boolean').custom((value) => {
        if (value === undefined || typeof value === "boolean") return true;
        throw new Error('isExpired must be boolean when set');
    }),
    body('*.meta.addedOn', 'meta.addedOn field must be a string').exists().notEmpty().isString().trim().escape(), // Sanitization
  ], async (req : Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error("error", errors.array());
            throw new BadRequestException("Incorrect request body");
        }
        await postUsers(req.body as NewUser[]);
        return res.status(201).json({status: "created"});
    } catch (err) {
        logger.error("error", err);
        return next(err);
    }

});

export default router;
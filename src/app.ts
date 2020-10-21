import express from "express";
import bodyParser from "body-parser";
import userController from "./controllers/users"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import dotenv from "dotenv";
import logger from "./util/logger";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, UNAUTHORIZED } from "./util/errors";

// for development
if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} 

const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Controllers
app.use(userController);

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    switch(err.name) {
        case UNAUTHORIZED:
            return res.status(401).json({error: "Invalid token"});
        case BAD_REQUEST:
            return res.status(400).json({ error: err.toString()});
        default:
            return res.status(500).json({ error: err.toString()});
    }
});

app.listen(process.env.PORT || 3000);


export default app;
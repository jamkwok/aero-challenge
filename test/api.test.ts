import request from "supertest";
import app from "../src/app";
import { JWT_SECRET } from "../src/util/decodeJwt";
import jwt from "jsonwebtoken";

const token = jwt.sign({ foo: 'bar' }, JWT_SECRET);

describe("GET /users", () => {
    it("should return 401 when JWT not attached", () => {
        return request(app)
            .get("/users")
            .expect(401);
    });

    it("should return 200 with JWT", () => {
        return request(app)
            .get("/users")
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });
});

describe("POST /users", () => {
    it("should return 401 when JWT not attached", () => {
        return request(app)
            .post("/users")
            .expect(401);
    });

    it("should return 200 with JWT", () => {
        return request(app)
            .post("/users")
            .set('Authorization', 'Bearer ' + token)
            .send([{
                "name": "james kwok",
                "email": "james@james.com",
                "meta": {
                  "isVerified": true,
                  "isExpired": false,
                  "addedOn": "addedOn"
                }
              }])
            .expect(201);
    });
});

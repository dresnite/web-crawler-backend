import request from "supertest";
import app from "../src/app";
import { dummyUser, prepareDatabase } from "./fixtures/database";
import mongoose from "mongoose";

beforeEach(prepareDatabase);
afterAll(mongoose.disconnect);

test("Should log in existing user", async () => {
    await request(app)
        .post("/user/login")
        .send(dummyUser)
        .expect(200);
});
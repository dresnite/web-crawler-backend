import request from "supertest";
import app from "../src/app";
import { dummyUser, dummyUserId, prepareDatabase } from "./fixtures/database";
import mongoose from "mongoose";
import User from "../src/models/user";

beforeEach(prepareDatabase);
afterAll(mongoose.disconnect);

test("Should log in existing user", async () => {
    await request(app)
        .post("/user/login")
        .send(dummyUser)
        .expect(200);
});

test("Should log out an existing user", async () => {
    await request(app)
        .post("/user/logout")
        .set("Cookie", `authToken=${dummyUser.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(dummyUserId);
    expect(user?.tokens.length).toBe(0);
});
import request from "supertest";
import app from "../src/app";
import { dummyUser, dummyUserId, prepareDatabase } from "./fixtures/database";
import mongoose from "mongoose";
import User from "../src/models/user";
import { shutdownRedis } from "../src/utils/redis";
import CrawlingWorker from "../src/bullmq/worker";

beforeEach(prepareDatabase);
afterAll(mongoose.disconnect);
afterAll(CrawlingWorker.stop);
afterAll(shutdownRedis);

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

test("Should register a new user", async () => {
    const numberOfUsersBeforeRegister = (await User.find()).length;

    await request(app)
        .post("/user/register")
        .send({username: "somebody", password: "oncetoldme"})
        .expect(201);

    const numberOfUsersAfterRegister = (await User.find()).length;

    expect(numberOfUsersAfterRegister).toBe(numberOfUsersBeforeRegister + 1);
});
test("Should fail to register a new user", async () => {
    await request(app)
        .post("/user/register")
        .send({username: "somebody"})
        .expect(400);

        await request(app)
        .post("/user/register")
        .send({password: "oncetoldme"})
        .expect(400);

        await request(app)
        .post("/user/register")
        .send({username: dummyUser.username, password: "oncetoldme"})
        .expect(400);
});
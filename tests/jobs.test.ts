import app from "../src/app";
import request from "supertest";
import { dummyCrawlingJob, dummyCrawlingJobId, dummyUser, dummyUserId, prepareDatabase } from "./fixtures/database";
import mongoose from "mongoose";
import CrawlingJob from "../src/models/crawlingJob";

beforeEach(prepareDatabase);
afterAll(mongoose.disconnect);

const jobByIdQuery = `#graphql
    query JobById($id: ID!){
        crawlingJob(id: $id) {
            id
        }
    }
`;

const jobsByOwnerQuery = `#graphql
    query JobsByOwner($owner: ID!) {
        crawlingJobsByOwner(owner: $owner) {
            seed
        }
    }
`;

const originalJobsByOwnerQuery = `#graphql
    query JobsByOwner($owner: ID!) {
        originalCrawlingJobsByOwner(owner: $owner) {
            seed
        }
    }
`;

const createJobQuery = `#graphql
    mutation CreateCrawlingJob($owner: ID!, $seed: String!, $parent: ID) {
        createCrawlingJob(owner: $owner, seed: $seed, parent: $parent) {
            seed
        }
    }
`;

test("Should be unauthorized to get a crawling job", async () => {
    await request(app)
        .post("/graphql")
        .send({
            query: jobByIdQuery,
            variables: {
                id: dummyCrawlingJobId
            }
        })
        .expect(401);
});

test("Should get a crawling job successfully", async () => {
    await request(app)
        .post("/graphql")
        .set("Cookie", `authToken=${dummyUser.tokens[0].token}`)
        .send({
            query: jobByIdQuery,
            variables: {
                id: dummyCrawlingJobId
            }
        })
        .expect(200);
});

test("Should be unathorized to create a crawling job", async () => {
    await request(app)
        .post("/graphql")
        .send({
            query: createJobQuery,
            variables: {
                owner: dummyUserId,
                seed: "https://whatever.com"
            }
        })
        .expect(401);
});

test("Should create a crawling job successfully", async () => {
    const numberOfJobsBeforeRequest = (await CrawlingJob.find({})).length;

    await request(app)
        .post("/graphql")
        .set("Cookie", `authToken=${dummyUser.tokens[0].token}`)
        .send({
            query: createJobQuery,
            variables: {
                owner: dummyUserId,
                seed: "https://something.com"
            }
        })
        .expect(200);

    const numberOfJobsAfterRequest = (await CrawlingJob.find({})).length;

    expect(numberOfJobsAfterRequest).toBe(numberOfJobsBeforeRequest + 1);
});

test("Should obtain crawling jobs created by an user", async () => {
    const response = await request(app)
        .post("/graphql")
        .set("Cookie", `authToken=${dummyUser.tokens[0].token}`)
        .send({
            query: jobsByOwnerQuery,
            variables: {
                owner: dummyUserId
            }
        })
        .expect(200);

    expect(response.body.data.crawlingJobsByOwner[0]?.seed).toBe(dummyCrawlingJob.seed);
});

test("Should obtain original crawling jobs created by an user", async () => {
    const response = await request(app)
        .post("/graphql")
        .set("Cookie", `authToken=${dummyUser.tokens[0].token}`)
        .send({
            query: originalJobsByOwnerQuery,
            variables: {
                owner: dummyUserId
            }
        })
        .expect(200);

    expect(response.body.data.originalCrawlingJobsByOwner[0]?.seed).toBe(dummyCrawlingJob.seed);
    expect(response.body.data.originalCrawlingJobsByOwner.length).toBe(1);
});


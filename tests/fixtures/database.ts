import User from "../../src/models/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/utils/config";
import mongoose from "mongoose";
import IUser from "../../src/interfaces/IUser";
import CrawlingJob from "../../src/models/crawlingJob";
import ICrawlingJob from "../../src/interfaces/ICrawlingJob";
import Status from "../../src/graphql/status";

export const dummyUserId = new mongoose.Types.ObjectId();

export const dummyUser: IUser = {
    username: "creeper",
    password: "1FQg368Ctyu87wc",
    tokens: [
        {
            token: jwt.sign({ _id: dummyUserId }, JWT_SECRET)
        }
    ]
};

export const dummyCrawlingJobId = new mongoose.Types.ObjectId();

export const dummyCrawlingJob: ICrawlingJob = {
    owner: dummyUserId.toString(),
    _id: dummyCrawlingJobId.toString(),
    parentJob: null,
    seed: "https://elpais.com",
    status: Status.Working,
    linksFound: [],
    childrenJobs: []
};

export async function prepareDatabase() {
    await User.deleteMany();
    await CrawlingJob.deleteMany();

    await (new User({_id: dummyUserId, ...dummyUser})).save();
    await (new CrawlingJob(dummyCrawlingJob)).save();
}
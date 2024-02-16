import IUser from "../../src/interfaces/IUser";
import User from "../../src/models/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/utils/config";
import mongoose from "mongoose";

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

export async function prepareDatabase() {
    await User.deleteMany();

    await (new User(dummyUser)).save();
}
import UserDocument from "../interfaces/UserDocument";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { IS_DEVELOPMENT_SERVER } from "../utils/config";
import { Response } from "express";

export async function getUserByCredentials(username: string, password: string): Promise<UserDocument & Document> {
    const user = await User.findOne({ username });

    if(!user) {
        console.log(`${username} couldn't log in because there wasn't a user with that username`)

        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        console.log(`${username} couldn't log in because the password they introduced was incorrect`);

        throw new Error("User not found");
    }

    return user;
}

export async function createUserToken(user: UserDocument) {
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET || "secret");

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

export async function assignTokenToCookie(res: Response, token: string) {
    res.cookie("authToken", token, {
        path: "/",
        httpOnly: true,
        secure: !IS_DEVELOPMENT_SERVER,
        sameSite: "strict"
    });
}

export async function removeUserToken(user: UserDocument, token: string) {
    user.tokens = user.tokens.filter((t) => {
        return t.token !== token;
    });

    await user.save();
}

export async function registerUser(username: string, password: string): Promise<UserDocument> {
    const user = new User({username, password});

    await user.save();

    return user;
}
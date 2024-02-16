import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { JWT_SECRET } from "../utils/config";
import { Request, Response, NextFunction } from "express";
import PreprocessedAuthRequest from "../interfaces/PreprocessedAuthRequest";

const DEFAULT_AUTH_ERROR = "Please authenticate";

export default async function auth(req: PreprocessedAuthRequest, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.authToken;

        const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if(!user) {
            return res.status(401).send({ error: DEFAULT_AUTH_ERROR });
        }

        req.token = token;
        req.user = user;

        next();
    } catch(e) {
        res.status(401).send({ error: DEFAULT_AUTH_ERROR })
    }
}
import { Request, Response } from "express";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest";
import { createUserToken, getUserByCredentials, removeUserToken } from "../services/user";
import { IS_DEVELOPMENT_SERVER } from "../utils/config";

export async function logIn(req: Request, res: Response) {
    try {
        const user = await getUserByCredentials(req.body.username, req.body.password);
        const token = await createUserToken(user);

        res.cookie("authToken", token, {
            path: "/",
            httpOnly: true,
            secure: !IS_DEVELOPMENT_SERVER,
            sameSite: "strict"
        });

        res.send({ user, token });
    } catch(e: any) {
        res.status(400).send({
            error: "Failed to authenticate"
        });
    }
}

export async function logOut(req: AuthenticatedRequest, res: Response) {
    try {
        await removeUserToken(req.user!, req.token!);

        res.send();
    } catch(e: any) {
        res.status(400).send({
            error: "Failed to log out"
        });
    }
}

export async function register(req: Request, res: Response) {

}
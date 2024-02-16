import { Request, Response } from "express";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest";
import { assignTokenToCookie, createUserToken, getUserByCredentials, registerUser, removeUserToken } from "../services/user";

export async function logIn(req: Request, res: Response) {
    try {
        const user = await getUserByCredentials(req.body.username, req.body.password);
        const token = await createUserToken(user);

        await assignTokenToCookie(res, token);

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
    try {
        const user = await registerUser(req.body.username, req.body.password);
        const token = await createUserToken(user);

        await assignTokenToCookie(res, token);

        res.status(201).send({ user, token });
    } catch(e: any) {
        res.status(400).send({
            error: "Failed to register"
        });
    }
}
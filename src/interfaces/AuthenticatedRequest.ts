import { Request } from "express";
import IUser from "./IUser";

export default interface AuthenticatedRequest extends Request {
    token?: string,
    user?: IUser
}

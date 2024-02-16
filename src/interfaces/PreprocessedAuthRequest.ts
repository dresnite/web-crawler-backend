import { Request } from "express";
import IUser from "./IUser";

export default interface PreprocessedAuthRequest extends Request {
    token?: string,
    user?: IUser
}

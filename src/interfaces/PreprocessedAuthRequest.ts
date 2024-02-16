import { Request } from "express";
import IUser from "./IUser";

// All of these values 
export default interface PreprocessedAuthRequest extends Request {
    token?: string,
    user?: IUser
}

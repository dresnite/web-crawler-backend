import { Request } from "express";
import UserDocument from "./UserDocument";

export default interface AuthenticatedRequest extends Request {
    token?: string,
    user?: UserDocument
}

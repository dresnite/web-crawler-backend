import { Document } from "mongoose";
import IUser from "./IUser";

export default interface UserDocument extends IUser, Document {
    
}
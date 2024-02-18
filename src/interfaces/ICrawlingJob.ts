import { ObjectId } from "mongoose";
import Status from "../graphql/status";

export default interface ICrawlingJob {
    _id: string | undefined,
    parentJob: ICrawlingJob | ObjectId | null,
    seed: string,
    status: Status,
    linksFound: string[], // had to make it linksfound instead of links because of a conflict with document
    childrenJobs: string[] // not children because of a conflict with Document too
}
import { ObjectId } from "mongoose";
import { createCrawlingJob, getChildrenCrawlingJobs, getCrawlingJobById, getParentCrawlingJob, validateAuth } from "../services/crawlingJob";
import ICrawlingJob from "../interfaces/ICrawlingJob";
import CustomContext from "../interfaces/CustomContext";

export async function getCrawlingJob(_root: any, { id }: { id: string }) {
    return await getCrawlingJobById(id);
}

export async function getParentJob(job: ICrawlingJob) {
    if(job.parentJob) {
        return await getParentCrawlingJob(
            (job.parentJob as ObjectId).toString()
        );
    }

    return null;
}

export async function getChildrenJobs(job: ICrawlingJob) {
    return await getChildrenCrawlingJobs(job._id!);
}

export async function createJob(_root: any, job: ICrawlingJob, context: CustomContext) {
    validateAuth(context);
    return await createCrawlingJob(job);
}
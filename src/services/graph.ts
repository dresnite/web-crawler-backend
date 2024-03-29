import Status from "../graphql/status";
import CustomContext from "../interfaces/CustomContext";
import ICrawlingJob from "../interfaces/ICrawlingJob";
import CrawlingJob from "../models/crawlingJob";
import unauthorizedError from "../utils/unauthorizedError";
import { normalize } from "../utils/normalize";

export async function getCrawlingJobById(id: string): Promise<ICrawlingJob | null> {
    try {
        const crawlingJob = await CrawlingJob.findById(id);

        if(!crawlingJob) {
            return null;
        }

        return crawlingJob;
    } catch {
        return null;
    }
}

export async function getCrawlingJobsByOwnerId(id: string): Promise<ICrawlingJob[]> {
    try {
        const crawlingJob = await CrawlingJob.find({ owner: id });

        return crawlingJob;
    } catch {
        return [];
    }
}

export async function getOriginalCrawlingJobsByOwnerId(id: string): Promise<ICrawlingJob[]> {
    try {
        const crawlingJob = await CrawlingJob.find({
            owner: id,
            $or: [
              { parentJob: { $exists: false } }, 
              { parentJob: null }
            ]
        });

        return crawlingJob;
    } catch {
        return [];
    }
}

export async function getParentCrawlingJob(parentId: string|null): Promise<ICrawlingJob | null> {
    if(parentId) {
        await getCrawlingJobById(parentId);
    }

    return null;
}

export async function getChildrenCrawlingJobs(parentId: string): Promise<ICrawlingJob[]>{
    try {
        return await CrawlingJob.find({parentJob: parentId});
    } catch {
        return [];
    }
}

export async function createCrawlingJob(job: ICrawlingJob): Promise<ICrawlingJob | null> {
    try {
        const newJob = new CrawlingJob({
            owner: job.owner,
            parentJob: job.parentJob,
            seed: normalize(job.seed),
            status: Status.Working,
            linksFound: job.linksFound,
            childrenJobs: []
        });
        
        await newJob.save();

        return newJob;
    } catch(e) {
        return null;
    }
}

export async function updateCrawlingJobStatus(jobId: string, status: Status): Promise<ICrawlingJob | null> {
    const found = await CrawlingJob.findById(jobId);

    if(!found) return null;
    
    found.status = status;

    return found;
}

export async function finishCrawlingJob(jobId: string, status: Status, links: string[]): Promise<ICrawlingJob | null> {
    try {
        const found = await CrawlingJob.findById(jobId);

        if(!found) return null;
        
        found.status = status;
        found.linksFound = links;

        await found.save();

        return found;
    } catch(e) {
        console.log("Error while finishing crawling job", e);
        return null;
    }
}

export const validateAuth = (context: CustomContext) => {
    if(!context.user) {
        throw unauthorizedError("Not authorized to do this");
    }
}
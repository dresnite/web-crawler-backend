import { Job } from "bullmq";
import ICrawlingJob from "../interfaces/ICrawlingJob";
import Status from "../graphql/status";
import { createCrawlingJob, finishCrawlingJob, updateCrawlingJobStatus } from "../services/graph";
import CrawlingJob from "../models/crawlingJob";
import axios from "axios";
import { crawlContent } from "../services/crawling";

export async function processJob(job: Job): Promise<string> {
    const crawlingJob = job.data as ICrawlingJob;

    try {
        if(crawlingJob.status === Status.Finished) {
            return crawlingJob.seed;
        }

        if(crawlingJob.status === Status.Stopped) {
            await updateCrawlingJobStatus(crawlingJob._id!, Status.Working);
        }

        const response = await axios.get(crawlingJob.seed);

        const { links, routes } = crawlContent(crawlingJob.seed, response!.data);

        routes.forEach((link) => {
            const newJob = new CrawlingJob({
                owner: crawlingJob.owner,
                parentJob: crawlingJob.parentJob ?? crawlingJob._id,
                seed: link,
                status: Status.Working,
                linksFound: [],
                childrenJobs: []
            });

            createCrawlingJob(newJob)
        });


        await completeCrawlingJob(crawlingJob, Status.Finished, Array.from(links));

        return crawlingJob.seed;
    } catch {
        await completeCrawlingJob(crawlingJob, Status.Stopped, []);
        return crawlingJob.seed;
    }
}

export async function completeCrawlingJob(crawlingJob: ICrawlingJob, status: Status, links: string[]) {
    validateCrawlingJobId(crawlingJob);

    crawlingJob.linksFound = links;
    crawlingJob.status = status;

    finishCrawlingJob(crawlingJob._id!, status, links);
}

function validateCrawlingJobId(job: ICrawlingJob) {
    if(!job._id) {
        throw new Error(`The job for ${job.seed} didn't have a valid id`);
    }
}
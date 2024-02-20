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
        const similars = await CrawlingJob.find({ seed: crawlingJob.seed, _id: {$ne: crawlingJob._id } })

        if(similars.length > 0) {
            throw new Error("Stopped a crawling process that already exists");
        }

        if(crawlingJob.status === Status.Finished) {
            return crawlingJob.seed;
        }

        if(crawlingJob.status === Status.Stopped) {
            await updateCrawlingJobStatus(crawlingJob._id!, Status.Working);
        }

        const response = await axios.get(crawlingJob.seed);

        const { links, routes } = crawlContent(crawlingJob.seed, response!.data);

        for(const route of routes) {
            try {
                const routeRes = await axios.get(route);

                if(routeRes.status === 100) {
                    console.log(`⛔️ Failed to analyze children ${route}, invalid status ${routeRes.status}`,);
                } else {
                    const newJob = new CrawlingJob({
                        owner: crawlingJob.owner,
                        parentJob: crawlingJob.parentJob ?? crawlingJob._id,
                        seed: route,
                        status: Status.Working,
                        linksFound: [],
                        childrenJobs: []
                    });
    
                    console.log();
        
                    const resultJob = await createCrawlingJob(newJob);

                    if(!resultJob) {
                        throw new Error("Failed to create job");
                    }
                    
                    const crawled = crawlContent(route, routeRes!.data);
        
                    await completeCrawlingJob(resultJob, Status.Finished, Array.from(crawled.links));
    
                    console.log(`✅ Successfully analyzed children ${route}`);
                }
            } catch(e) {
                //console.log(`⛔️ Failed to analyze children ${route}`);
            }
        }

        await completeCrawlingJob(crawlingJob, Status.Finished, Array.from(links));

        return crawlingJob.seed;
    } catch {
        await completeCrawlingJob(crawlingJob, Status.Stopped, []);
        return crawlingJob.seed;
    }
}

export async function completeCrawlingJob(crawlingJob: ICrawlingJob, status: Status, links: string[]) {
    try {
        validateCrawlingJobId(crawlingJob);

        crawlingJob.linksFound = links;
        crawlingJob.status = status;

        await finishCrawlingJob(crawlingJob._id!, status, links);
    } catch(e) {
        console.log("Error while completing crawling job", e);
    }
}

function validateCrawlingJobId(job: ICrawlingJob) {
    if(!job._id) {
        throw new Error(`The job for ${job.seed} didn't have a valid id`);
    }
}
import { createJob, getChildrenJobs, getCrawlingJob, getCrawlingJobsByOwner, getOriginalCrawlingJobsByOwner, getParentJob } from "../controllers/crawlingJob";

const resolvers = {
    Query: {
        crawlingJob: getCrawlingJob,
        crawlingJobsByOwner: getCrawlingJobsByOwner,
        originalCrawlingJobsByOwner: getOriginalCrawlingJobsByOwner
    },

    CrawlingJob: {
        parentJob: getParentJob,
        childrenJobs: getChildrenJobs
    },

    Mutation: {
        createCrawlingJob: createJob
    }
};

export default resolvers;
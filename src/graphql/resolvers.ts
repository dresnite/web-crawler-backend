import { createJob, getChildrenJobs, getCrawlingJob, getCrawlingJobsByOwner, getOriginalCrawlingJobsByOwner, getParentJob } from "../controllers/graph";

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
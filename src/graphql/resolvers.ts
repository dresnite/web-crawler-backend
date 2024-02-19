import { createJob, getChildrenJobs, getCrawlingJob, getCrawlingJobsByOwner, getCrawlingJobsByParentId, getOriginalCrawlingJobsByOwner, getParentJob } from "../controllers/graph";

const resolvers = {
    Query: {
        crawlingJob: getCrawlingJob,
        crawlingJobsByOwner: getCrawlingJobsByOwner,
        originalCrawlingJobsByOwner: getOriginalCrawlingJobsByOwner,
        crawlingJobsByParentId: getCrawlingJobsByParentId
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
import { createJob, getChildrenJobs, getCrawlingJob, getCrawlingJobsByOwner, getParentJob } from "../controllers/crawlingJob";

const resolvers = {
    Query: {
        crawlingJob: getCrawlingJob,
        crawlingJobsByOwner: getCrawlingJobsByOwner
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
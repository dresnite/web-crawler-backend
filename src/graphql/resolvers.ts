import { createJob, getChildrenJobs, getCrawlingJob, getParentJob } from "../controllers/crawlingJob";

const resolvers = {
    Query: {
        crawlingJob: getCrawlingJob
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
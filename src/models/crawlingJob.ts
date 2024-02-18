import mongoose from "mongoose";
import ICrawlingJob from "../interfaces/ICrawlingJob";

const crawlingJobSchema = new mongoose.Schema<ICrawlingJob>({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    parentJob: {
        type: mongoose.Types.ObjectId,
        ref: "CrawlingJob"
    },
    seed: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    linksFound: [{
        type: String,
        required: true
    }],
    childrenJobs: [{
        type: mongoose.Types.ObjectId,
        ref: "CrawlingJob"
    }]
});

const CrawlingJob = mongoose.model("CrawlingJob", crawlingJobSchema);

export default CrawlingJob;
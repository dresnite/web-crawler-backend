import { processJob } from "../controllers/crawling";
import ICrawlingJob from "../interfaces/ICrawlingJob";
import { JOB_QUEUE_NAME } from "../utils/config";
import { queueOptions } from "./options";
import { Worker, Job, } from "bullmq";

export const worker = new Worker<ICrawlingJob, string>(JOB_QUEUE_NAME, processJob, { autorun: false, ...queueOptions});

worker.on("completed", (job: Job, seed: string) => {
    console.log(`✅ Awesome, just finished crawling ${seed}`);
});

worker.on("failed", () => {
    console.log("⛔️ A crawling worker failed!");
});
import { processJob } from "../controllers/queue";
import { JOB_QUEUE_NAME } from "../utils/config";
import { queueOptions } from "./options";
import { Worker, Job, } from "bullmq";

export const worker = new Worker(JOB_QUEUE_NAME, processJob, { autorun: false, ...queueOptions});

worker.on("completed", (job: Job, returnvalue: any) => {
    const seed = returnvalue as string;

    console.log(`✅ Awesome, just finished crawling ${seed}`);
});

worker.on("failed", (job, error) => {
    console.log("⛔️ A crawling worker failed!");
});
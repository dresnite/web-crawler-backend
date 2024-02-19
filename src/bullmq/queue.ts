import { JOB_QUEUE_NAME } from "../utils/config";
import { queueOptions } from "./options";
import { Queue } from "bullmq";

export const queue = new Queue(JOB_QUEUE_NAME, queueOptions);
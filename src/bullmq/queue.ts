import { JOB_QUEUE_NAME } from "../utils/config";
import RedisConnection from "../utils/redis";
import { Queue } from "bullmq";

export const queue = new Queue(JOB_QUEUE_NAME, { connection: RedisConnection.getInstance() });
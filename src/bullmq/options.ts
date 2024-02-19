import { QueueOptions } from "bullmq";
import { REDIS_URI } from "../utils/config";

const parsedRedisUri = new URL(REDIS_URI);

export const queueOptions: QueueOptions = {
  connection: {
    host: parsedRedisUri.hostname,
    port: parseInt(parsedRedisUri.port),
    username: parsedRedisUri.username,
    password: parsedRedisUri.password
  }
};

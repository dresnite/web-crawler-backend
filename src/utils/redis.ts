import { REDIS_URI } from "./config";
import Redis from "ioredis";

class RedisConnection {
  private static instance: Redis;
  private static closed: boolean = false;
  
  private constructor() {
    // Private constructor to prevent instantiation outside this class
  }

  static getInstance(): Redis {
    if(!RedisConnection.instance) {
      const parsedRedisUri = new URL(REDIS_URI);

      RedisConnection.instance = new Redis({
        host: parsedRedisUri.hostname,
        port: parseInt(parsedRedisUri.port),
        username: parsedRedisUri.username,
        password: parsedRedisUri.password,
        maxRetriesPerRequest: null
      });
    }
    
    return RedisConnection.instance;
  }

  static close() {
    if(!this.closed && this.instance) {
      this.instance.quit();
      this.closed = true;
    } 
  }
}

export async function shutdownRedis() {
  await new Promise<void>((resolve) => {
    RedisConnection.getInstance().quit(() => {
      resolve();
    });
  });

  await new Promise(resolve => setImmediate(resolve));
}

export default RedisConnection;

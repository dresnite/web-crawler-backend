import { processJob } from "../controllers/crawling";
import ICrawlingJob from "../interfaces/ICrawlingJob";
import { JOB_QUEUE_NAME } from "../utils/config";
import RedisConnection from "../utils/redis";
import { Worker, Job } from "bullmq";

class CrawlingWorker {
  private static instance: CrawlingWorker;
  private worker: Worker<ICrawlingJob, string>;

  private constructor() {
    this.worker = new Worker<ICrawlingJob, string>(JOB_QUEUE_NAME, processJob, {
      autorun: false,
      connection: RedisConnection.getInstance(),
    });

    this.worker.on("completed", (job: Job, seed: string) => {
      console.log(`✅ Awesome, just finished crawling ${seed}`);
    });

    this.worker.on("failed", (error) => {
      console.log("⛔️ A crawling worker failed!", error);
    });

    this.worker.on("error", (error) => {
        //console.log("⛔️ A crawling worker throwed an error!", error);
    })
  }

  static stop() {
    if(this.instance) {
        this.instance.stop()
    }
  }

  static getInstance(): CrawlingWorker {
    if(!CrawlingWorker.instance) {
      CrawlingWorker.instance = new CrawlingWorker();
    }
    return CrawlingWorker.instance;
  }

  start() {
    this.worker.run();
  }

  async stop() {
    await this.worker?.close();
  }
}

export default CrawlingWorker;

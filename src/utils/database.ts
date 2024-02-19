import mongoose from "mongoose";
import { MONGODB_URI } from "./config";
import CrawlingWorker from "../bullmq/worker";

mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        CrawlingWorker.getInstance().start();
    })
    .catch(async (error) => {
        console.error("Connection error:", error);

        throw new Error("Failed to establish a connection with the database");
    });
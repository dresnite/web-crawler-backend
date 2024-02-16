import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

console.log("Web Crawler is starting");
console.log("Attempting to establish a connection with the database... (1/2)");

mongoose
    .connect(MONGODB_URI)
    .then(async () => {
        console.log("Successfully established a connection with the database (2/2)");
    })
    .catch(async (error) => {
        console.error("Connection error:", error);

        throw new Error("Failed to establish a connection with the database");
    });
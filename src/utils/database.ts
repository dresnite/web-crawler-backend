import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if(typeof MONGODB_URI !== "string") {
    throw new Error("You didn't define a valid MongoDB URI in the env MONGODB_URI");
}

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
import app from "./app";

const DEFAULT_PORT: number = 3000;

const port: number = parseInt(process.env.PORT ?? "") || DEFAULT_PORT;

if(isNaN(port)) {
    throw new Error("The value assigned to the env PORT is not a valid number");
}

app.listen(port, () => {
    console.log(`Web Crawler's API is running in the port ${port}`);
});
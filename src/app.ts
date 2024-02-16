import express from "express";
import cookieParser from "cookie-parser";
import "./utils/database";
import userRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

export default app;
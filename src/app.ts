import express from "express";
import cookieParser from "cookie-parser";
import "./utils/database";
import userRouter from "./routes/user";
import graphqlRouter from "./routes/graphql";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(graphqlRouter);

export default app;
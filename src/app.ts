import express from "express";
import cookieParser from "cookie-parser";
import "./utils/database";
import userRouter from "./routes/user";
import graphqlRouter from "./routes/graphql";
import cors from "cors";

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(graphqlRouter);

export default app;
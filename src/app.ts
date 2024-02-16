import express from "express";
import cookieParser from "cookie-parser";
import "./utils/database";

const app = express();

app.use(express.json());
app.use(cookieParser());

export default app;
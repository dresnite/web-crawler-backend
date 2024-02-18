import express from "express";
import { startServer } from "../graphql/server";

const router = express.Router();

startServer(router);

export default router;
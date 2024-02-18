import express from "express";
import { startServer } from "../graphql/server";
import auth from "../middleware/auth";

const router = express.Router();
router.use("/graphql", auth);

startServer(router);

export default router;
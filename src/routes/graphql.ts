import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import server from "../graphql/server";

const router = express.Router();

router.use("/graphql", expressMiddleware(server));

export default router;
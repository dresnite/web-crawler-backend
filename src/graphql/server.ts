import { ApolloServer } from "@apollo/server";
import schema from "./schema";
import resolvers from "./resolvers";
import { Router } from "express";
import { expressMiddleware } from "@apollo/server/express4";

const server: ApolloServer = new ApolloServer({typeDefs: schema, resolvers});

export async function startServer(router: Router) {
    await server.start();

    router.use("/graphql", expressMiddleware(server));
};

export default server;
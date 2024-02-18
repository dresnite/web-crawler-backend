import { ApolloServer, ContextFunction } from "@apollo/server";
import schema from "./schema";
import resolvers from "./resolvers";
import { Router } from "express";
import { ExpressContextFunctionArgument, expressMiddleware } from "@apollo/server/express4";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest";
import CustomContext from "../interfaces/CustomContext";

const server = new ApolloServer<CustomContext>({typeDefs: schema, resolvers});

const getContext: ContextFunction<[ExpressContextFunctionArgument], CustomContext> = async ({ req }: ExpressContextFunctionArgument) => {
    const request = req as AuthenticatedRequest;

    if(request.user) {
        return { user: request.user };
    }

    return {};
}

export async function startServer(router: Router) {
    await server.start();

    router.use("/graphql", expressMiddleware(server, {
        context: getContext
    }));
};

export default server;
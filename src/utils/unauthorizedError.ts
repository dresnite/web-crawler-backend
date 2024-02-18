import { GraphQLError } from "graphql";

export default function unauthorizedError(message: string): GraphQLError {
    return new GraphQLError(message, {
        extensions: { code: "UNAUTHORIZED_ERROR" }
    });
}
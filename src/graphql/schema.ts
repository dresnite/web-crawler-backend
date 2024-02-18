import { readFileSync } from "fs";
import path from "path";

const schema = readFileSync(path.resolve(__dirname, "schema.graphql"), "utf8");

export default schema;
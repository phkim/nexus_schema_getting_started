"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const db_1 = require("./db");
exports.server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: () => ({
        db: db_1.db
    })
});

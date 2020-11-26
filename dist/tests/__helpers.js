"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestContext = void 0;
const get_port_1 = __importStar(require("get-port"));
const graphql_request_1 = require("graphql-request");
const server_1 = require("../api/server");
function graphqlTestContext() {
    let serverInstance = null;
    return {
        async before() {
            const port = await get_port_1.default({ port: get_port_1.makeRange(4000, 6000) });
            serverInstance = await server_1.server.listen({ port });
            return new graphql_request_1.GraphQLClient(`http://localhost:${port}`);
        },
        async after() {
            serverInstance === null || serverInstance === void 0 ? void 0 : serverInstance.server.close();
        }
    };
}
function createTestContext() {
    let ctx = {};
    const graphqlCtx = graphqlTestContext();
    beforeEach(async () => {
        const client = await graphqlCtx.before();
        Object.assign(ctx, {
            client,
        });
    });
    afterEach(async () => {
        await graphqlCtx.after();
    });
    return ctx;
}
exports.createTestContext = createTestContext;

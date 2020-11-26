"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.server.listen(process.env.SERVER_PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

const express = require("express");
const hubsRouter = require("./posts/post-router");

const server = express();

server.use(express.json());
server.use("/api/posts", hubsRouter);

module.exports = server;

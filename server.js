const express = require("express");
const postRouter = require("./posts/post-router");

const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send("Working");
});

module.exports = server;

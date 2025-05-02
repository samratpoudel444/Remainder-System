const { Server } = require('socket.io');
const express = require("express");
const http = require("http");
const {
  authenticateSocket,
} = require("../../../../gateway/middleware/socketIo");

const client = require("../../../db/config/redisClient");
const { userConnection } = require('./userConnectionAndDisconnection');

  io = new Server(3000, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });

  userConnection(io)


module.exports = {
io
};


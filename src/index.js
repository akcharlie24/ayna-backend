"use strict";

require("dotenv").config();

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    let { Server } = require("socket.io");
    let io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.CORS_ORIGIN || "*", //TODO: change this to be captured from env file
        methods: ["GET", "POST", "PUT"],
        allowedHeaders: ["my-custom-header", "Authorization", "Content-Type"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("connection done");
      socket.on("user-message", (message) => {
        io.emit("ser-message", message);
      });
      socket.on("clicked-chat", (chatId) => {
        io.emit("chat-click", chatId);
      });
    });

    io.on("disconnect", () => {
      console.log("user disconnect");
    });
  },
};

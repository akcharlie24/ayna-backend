"use strict";

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
        origin: "http://localhost:3000", //TODO: change this to be captured from env file
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("user-message", (message) => {
        io.emit("ser-message", message);
      });
    });

    io.on("disconnect", () => {
      console.log("user disconnect");
    });
  },
};

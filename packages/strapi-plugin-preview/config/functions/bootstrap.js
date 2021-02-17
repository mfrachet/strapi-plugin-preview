const http = require("http");
const httpServer = http.createServer();

const io = require("socket.io")(httpServer, {
  cors: true,
  origins: [
    "http://localhost:3001",
    "http://localhost:1337",
    "http://localhost:8000",
  ],
});

module.exports = () => {
  console.log("Init strapi preview");

  io.on("connection", (socket) => {
    socket.on("url-change", (e) => {
      socket.broadcast.emit("url-change", e);
    });

    socket.on("toggle-preview", () => {
      socket.broadcast.emit("toggle-preview");
    });

    socket.on("set-url", (url) => {
      socket.broadcast.emit("set-url", url);
    });

    socket.on("jwt-token", (token) => {
      socket.broadcast.emit("jwt-token", token);
    });

    socket.on("token-received", () => {
      socket.broadcast.emit("token-received");
    });

    socket.on("client-handshake", () => {
      socket.broadcast.emit("client-handshake");
    });
  });

  httpServer.listen(3000);
};

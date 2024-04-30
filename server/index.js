import { createServer } from "http";
import { Server } from "socket.io";

import { Chess } from "chess.js";
const chess = new Chess();

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a player connected");

  socket.on("startingPosition", () => {
    socket.emit("currentPosition", chess.fen());
  });

  socket.on("validate", (move) => {
    try {
      chess.move(move);
    } catch (err) {
      console.log("illegal move");
    }
    socket.emit("currentPosition", chess.fen());
    socket.broadcast.emit("currentPosition", chess.fen());
  });

  socket.on("resetGame", () => {
    chess.reset();
    socket.emit("currentPosition", chess.fen());
    socket.broadcast.emit("currentPosition", chess.fen());
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

import { createServer } from "http";
import { Server } from "socket.io";

import { rooms, addPlayerToRoom, removePlayerFromRoom } from "./chessRooms.js";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a player connected");

  const playerID = socket.id;
  const { room, color } = addPlayerToRoom(playerID);
  const chess = rooms[room].chess;

  socket.join(room);

  socket.on("startingPosition", () => {
    io.to(room).emit("currentPosition", chess.fen());
    socket.emit("color", color);
  });

  socket.on("validate", (move) => {
    try {
      if (chess._turn !== color[0]) throw Error("wrong color");
      console.log(chess._turn);
      chess.move(move);
    } catch (err) {
      console.log("illegal move");
    }
    io.to(room).emit("currentPosition", chess.fen());
  });

  // socket.on("resetGame", () => {
  //   chess.reset();
  //   io.to(room).emit("currentPosition", chess.fen());
  // });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removePlayerFromRoom(playerID);
    socket.leave(room);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

import { createServer } from "http";
import { Server } from "socket.io";

import { Chess } from "chess.js";
import { captureRejectionSymbol } from "events";
const chess = new Chess();

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = [
  { white: "", black: "" },
  { white: "", black: "" },
  { white: "", black: "" },
  { white: "", black: "" },
  { white: "", black: "" },
];

function addPlayerToRoom(playerID) {
  for (let i = 0; i < rooms.length; i++) {
    if (!rooms[i].white) {
      rooms[i].white = playerID;
      console.log(rooms);
      return `room${i}`;
    } else if (!rooms[i].black) {
      rooms[i].black = playerID;
      console.log(rooms);
      return `room${i}`;
    }
  }
}

function removePlayerFromRoom(socket) {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].white === socket.id) {
      rooms[i].white = "";
      console.log(rooms);
      break;
    } else if (rooms[i].black === socket.id) {
      rooms[i].black = "";
      console.log(rooms);
      break;
    }
  }
}

io.on("connection", (socket) => {
  console.log("a player connected");

  const playerID = socket.id;
  addPlayerToRoom(playerID);

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
    removePlayerFromRoom(playerID);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

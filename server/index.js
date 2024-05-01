import { createServer } from "http";
import { Server } from "socket.io";

import { Chess } from "chess.js";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = [{ white: "", black: "", chess: null }];
const maxRooms = 5;
function addPlayerToRoom(playerID) {
  for (let room = 0; room < rooms.length; room++) {
    if (room === rooms.length - 1 && rooms.length <= maxRooms) {
      rooms.push({ white: "", black: "", chess: null });
    }
    if (!rooms[room].white) {
      rooms[room].white = playerID;
      rooms[room].chess = new Chess();
      console.dir(rooms, { depth: 1 });

      return { room, color: "white" };
    } else if (!rooms[room].black) {
      rooms[room].black = playerID;
      console.dir(rooms, { depth: 1 });

      return { room, color: "black" };
    }
  }
}

function removePlayerFromRoom(playerID) {
  for (let room = 0; room < rooms.length; room++) {
    if (rooms[room].white === playerID) {
      rooms[room].white = "";
      removeRoom(room);
      console.dir(rooms, { depth: 1 });
      break;
    } else if (rooms[room].black === playerID) {
      rooms[room].black = "";
      removeRoom(room);
      console.dir(rooms, { depth: 1 });
      break;
    }
  }
}

function removeRoom(room) {
  if (!rooms[room].white && !rooms[room].black) {
    rooms.splice(room, 1);
  }
}

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

  socket.on("resetGame", () => {
    chess.reset();
    io.to(room).emit("currentPosition", chess.fen());
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removePlayerFromRoom(playerID);
    socket.leave(room);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

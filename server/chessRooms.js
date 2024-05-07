import { Chess } from "chess.js";

const maxRooms = 5;
export const rooms = [{ white: "", black: "", chess: null }];

export function addPlayerToRoom(playerID) {
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

export function removePlayerFromRoom(playerID) {
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

export function removeRoom(room) {
  if (!rooms[room].white && !rooms[room].black) {
    rooms.splice(room, 1);
  }
}

import Board from "./Board";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3000");

export default function Game() {
  const [currentPosition, setCurrentPosition] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Server connection estabilished");
    });

    socket.emit("startingPosition");

    socket.on("currentPosition", (position) => {
      setCurrentPosition(position);
    });
  });

  const onDrop = ({ piece, sourceSquare, targetSquare, promotion = "" }) => {
    if (
      (targetSquare[1] === "8" || targetSquare[1] === "1") &&
      piece[1] === "P"
    )
      promotion = "Q"; // always promote to queen
    let move = `${piece[1]}${sourceSquare}-${targetSquare}${promotion}`;
    socket.emit("validate", move);
  };

  const resetGame = () => {
    socket.emit("resetGame");
  };

  return (
    <>
      <div>
        <div className="border-2 border-black">
          <Board position={currentPosition} onDrop={onDrop} />
        </div>

        <button
          className="mt-5 rounded-sm border-2 p-1 text-white"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </>
  );
}

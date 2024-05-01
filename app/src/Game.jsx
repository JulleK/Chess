import Board from "./Board";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  );
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Server connection estabilished");
      });

      socket.on("currentPosition", (position) => {
        console.log(position);
        setCurrentPosition(position);
      });
    }
  }, [socket]);

  const joinGame = () => {
    setGameStarted(true);
    const newSocket = io("ws://localhost:3000");
    setSocket(newSocket);
  };

  const onDrop = (move) => {
    if (
      (move.targetSquare[1] === "8" || move.targetSquare[1] === "1") &&
      move.piece[1] === "P"
    )
      move.promotion = "Q"; // always promote to queen
    validateMove(move);
  };

  const validateMove = ({
    piece,
    sourceSquare,
    targetSquare,
    promotion = "",
  }) => {
    let move = `${piece[1]}${sourceSquare}-${targetSquare}${promotion}`;
    socket.emit("validate", move);
  };

  const resetGame = () => {
    socket.emit("resetGame");
    console.log("game resetted");
  };

  return (
    <>
      {!gameStarted && (
        <button onClick={joinGame} className="border-2 p-10 text-white">
          Join Game
        </button>
      )}

      {gameStarted && (
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
      )}
    </>
  );
}

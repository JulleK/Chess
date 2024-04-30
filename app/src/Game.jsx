import Board from "./Board";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3000");

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  );
  const [playerMove, setPlayerMove] = useState({
    from: "",
    to: "",
    piece: "",
    promotion: "",
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connection estabilished");
    });

    socket.on("currentPosition", (position) => {
      setCurrentPosition(position);
    });
  });

  const joinGame = () => {
    socket.emit("startingPosition");
    setGameStarted(true);
  };

  const onDrop = (move) => {
    console.log(move);
    setPlayerMove({
      from: move.sourceSquare,
      to: move.targetSquare,
      piece: move.piece,
      promotion: "q", // always promote to a queen for example simplicity
    });
    validateMove(move);
  };

  const validateMove = ({ piece, sourceSquare, targetSquare }) => {
    let move = `${piece[1]}${sourceSquare}-${targetSquare}`;
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
          <div className="text-white">
            <p className="mb-2">
              {playerMove.piece} from {playerMove.from || "?"} to{" "}
              {playerMove.to || "?"}
            </p>
            <button className="rounded-sm border-2 p-1" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}

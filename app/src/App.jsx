import { useState } from "react";
import Game from "./Game";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const joinGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="h-screen w-screen bg-slate-800">
      <div className="flex h-full items-center justify-center">
        {!gameStarted && (
          <button onClick={joinGame} className="border-2 p-10 text-white">
            Join Game
          </button>
        )}
        {gameStarted && <Game />}
      </div>
    </div>
  );
}

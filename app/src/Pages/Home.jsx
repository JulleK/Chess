import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Game from "./Game";
import SignupButton from "../Components/SignupButton";
import LoginButton from "../Components/LoginButton";

export default function Home({ user, setUser }) {
  const [gameStarted, setGameStarted] = useState(false);

  const joinGame = () => {
    setGameStarted(true);
  };

  return (
    <>
      {!user && (
        <div className="mt-32 flex flex-col text-white">
          <Link to="/Signup">
            <SignupButton />
          </Link>
          <Link to="/Login">
            <LoginButton />
          </Link>
        </div>
      )}

      {user && !gameStarted && (
        <Link to="Game">
          <button onClick={joinGame} className="border-2 p-10 text-white">
            Join Game
          </button>
        </Link>
      )}

      {gameStarted && <Game />}
    </>
  );
}

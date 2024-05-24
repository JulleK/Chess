import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Game from "./Game";
import SignupButton from "../Components/SignupButton";
import LoginButton from "../Components/LoginButton";
import { serverAddress } from "../config";

export default function Home({ user, setUser }) {
  const [gameStarted, setGameStarted] = useState(false);

  const joinGame = () => {
    setGameStarted(true);
  };

  const handleLogout = () => {
    axios
      .post(`${serverAddress}/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div>
          <Link to="Game">
            <button
              onClick={joinGame}
              className="rounded border-2 p-10 text-white"
            >
              Join Game
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 rounded border-2 p-10 text-white"
          >
            Logout
          </button>
        </div>
      )}

      {gameStarted && <Game />}
    </>
  );
}

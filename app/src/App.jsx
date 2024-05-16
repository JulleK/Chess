import { useState, useEffect } from "react";
import axios from "axios";
import Game from "./Game";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:5000/signup")
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const joinGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="h-screen w-screen bg-slate-800">
      <h1 className="h1">Chess JulleK</h1>
      <div className="flex h-auto items-center justify-center">
        {!loggedIn && (
          <div className="flex flex-col text-white">
            <Signup />
            <Login />
          </div>
        )}
        {loggedIn && !gameStarted && (
          <button onClick={joinGame} className="border-2 p-10 text-white">
            Join Game
          </button>
        )}

        {gameStarted && <Game />}
      </div>
    </div>
  );
}

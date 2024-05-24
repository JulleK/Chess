import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Game from "./Game";
import SignupButton from "../Components/SignupButton";
import LoginButton from "../Components/LoginButton";

export default function Home() {
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
    <>
      {!loggedIn && (
        <div className="mt-32 flex flex-col text-white">
          <Link to="/Signup">
            <SignupButton />
          </Link>
          <Link to="/Login">
            <LoginButton />
          </Link>
        </div>
      )}

      {loggedIn && !gameStarted && (
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

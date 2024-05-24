import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Error from "./pages/Error";
import axios from "axios";
import { serverAddress } from "./config";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check if the user is logged in on initial render
    axios
      .get(`${serverAddress}/me`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div
      className="flex h-screen w-screen flex-col items-center 
      justify-center bg-slate-800"
    >
      <Link to="/">
        <h1 className="h1 hover:cursor-pointer">Chess</h1>
      </Link>

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/Signup" element={<Signup setUser={setUser} />} />
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Game" element={<Game />} />
        <Route path="*" element={<Error errorCode={404} />} />
      </Routes>

      <footer className="mb-1 mt-auto text-center text-slate-500">
        © Copyright 2024 JulleK <br />
        All Rights Reserved
      </footer>
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Game from "./Game";

export default function App() {
  return (
    <>
      <div
        className="flex h-screen w-screen flex-col items-center 
      justify-center bg-slate-800"
      >
        <h1 className="h1">Chess JulleK</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Game" element={<Game />} />
        </Routes>

        <footer className="mb-1 mt-auto text-center text-slate-500">
          © Copyright 2024 JulleK <br />
          All Rights Reserved
        </footer>
      </div>
    </>
  );
}

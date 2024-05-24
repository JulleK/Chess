import { Route, Routes, Link } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Game from "./Pages/Game";
import Error from "./Pages/Error";

export default function App() {
  return (
    <>
      <div
        className="flex h-screen w-screen flex-col items-center 
      justify-center bg-slate-800"
      >
        <Link to="/">
          <h1 className="h1 hover:cursor-pointer">Chess</h1>
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Game" element={<Game />} />
          <Route path="*" element={<Error errorCode={404} />} />
        </Routes>

        <footer className="mb-1 mt-auto text-center text-slate-500">
          © Copyright 2024 JulleK <br />
          All Rights Reserved
        </footer>
      </div>
    </>
  );
}

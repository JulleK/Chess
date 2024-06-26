import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverAddress } from "../config";

export default function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (email && username && password) {
      axios
        .post(
          `${serverAddress}/signup`,
          { email, username, password },
          { withCredentials: true },
        )
        .then((response) => {
          setUser(response.data.user);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.msg) setErrorMsg(error.response.data.msg);
        });
    } else {
      setErrorMsg("please provide email, username, and password");
    }
  };

  return (
    <form>
      <h3 className="text-center">Signup</h3>
      {errorMsg && <h5 className="font-semibold text-red-500">{errorMsg}</h5>}
      <input
        type="email"
        placeholder="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register" onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
}

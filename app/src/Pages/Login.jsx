import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverAddress } from "../config";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (username && password) {
      axios
        .post(
          `${serverAddress}/login`,
          { username, password },
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
      setErrorMsg("please provide username, and password");
    }
  };
  return (
    <form>
      <h3 className="text-center">Login</h3>
      {errorMsg && <h5 className="font-semibold text-red-500">{errorMsg}</h5>}
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
      <button className="register" onClick={(e) => handleSubmit(e)}>
        Login
      </button>
    </form>
  );
}

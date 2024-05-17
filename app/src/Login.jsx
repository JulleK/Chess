import { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // todo
  };
  return (
    <form>
      <h3 className="text-center">Login</h3>
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
        Login
      </button>
    </form>
  );
}

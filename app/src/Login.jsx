export default function Login() {
  return (
    <form>
      <h3 className="text-center">Login</h3>
      <input type="text" placeholder="username" name="username" id="username" />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
      />
      <button className="register">Login</button>
    </form>
  );
}

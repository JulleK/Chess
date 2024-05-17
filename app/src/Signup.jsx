export default function Signup() {
  return (
    <form>
      <h3 className="text-center">Signup</h3>
      <input type="email" placeholder="email" name="email" id="email" />
      <input type="text" placeholder="username" name="username" id="username" />
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
      />
      <button className="register">Register</button>
    </form>
  );
}

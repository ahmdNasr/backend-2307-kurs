import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    console.log({ email, password });
    fetch("http://localhost:9000/users/login", {
      body: JSON.stringify({ email, password }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <br />
      <button type="button" onClick={submitLogin}>
        Login!
      </button>
    </form>
  );
};

export default LoginPage;

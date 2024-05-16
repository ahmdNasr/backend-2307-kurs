import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";

const LoginPage = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("resul.sadriu@hotmail.com");
  const [password, setPassword] = useState("hallo123");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    navigate("/dashboard");

    // save token --> "logged in"
    setToken(data.result.tokens.accessToken);
    setUser(data.result.user);
  };
  return (
    <main>
      <h1>Login</h1>
      <form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={loginUser}>Login</button>
      </form>

      <p>
        Don't have an account yet? <Link to="/register">Create Account</Link>
      </p>
    </main>
  );
};

export default LoginPage;

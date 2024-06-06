import { useState } from "react";
import { postlogin } from "../utils/api";
import { useShopState } from "../zustand";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useShopState()

  console.log({user})


  const submitLogin = async () => {
    const {user} = await postlogin({email, password}).json() 
    setUser(user)
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

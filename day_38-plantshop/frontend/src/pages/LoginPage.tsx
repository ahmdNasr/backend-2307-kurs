import { useState, useRef } from "react";
import { postlogin } from "../utils/api";
import { useShopState } from "../zustand";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {setUser} = useShopState()
  const navigate = useNavigate()
  const emailInput = useRef()
  const passwordInput = useRef()


  const submitLogin = async () => {
    const email = emailInput.current.value
    const password = passwordInput.current.value
    const {user} = await postlogin({email, password}).json() 
    setUser(user)
    navigate('/')
  };

  return (

    <form>
      <label>
        Email
        <input
          type="text"
          name="email"
          ref={emailInput}
        />
      </label>
      <br />
      <label>
        Password
        <input
          type="password"
          name="password"
          ref={passwordInput}
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



// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const {user, setUser} = useShopState()
//   const navigate = useNavigate()

//   console.log({user})


//   const submitLogin = async () => {
//     const {user} = await postlogin({email, password}).json() 
//     setUser(user)
//     navigate('/')

//   };

//   return (

//     <form>
//       <label>
//         Email
//         <input
//           type="text"
//           name="email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//       </label>
//       <br />
//       <label>
//         Password
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//       </label>
//       <br />
//       <button type="button" onClick={submitLogin}>
//         Login!
//       </button>
//     </form>
//   );
// };

// export default LoginPage;

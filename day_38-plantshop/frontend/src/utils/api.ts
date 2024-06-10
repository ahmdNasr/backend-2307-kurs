import ky from "ky";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = ky.extend({ prefixUrl: backendUrl });

// export const postlogin = (email: string, password: string) =>
//     api.post("users/login", { json: { email, password: password }, credentials: "include" });


type LoginParams = {
    email: string;
    password: string;  
}

export const postlogin = ({ email, password }: LoginParams) =>
  api.post("users/login", {
    json: { email, password: password },
    credentials: "include",
  });


export const postlogout = () =>
  api.post("users/logout", {
    credentials: "include",
  });
  
  // fetch("http://localhost:9000/users/login", {
//   body: JSON.stringify({ email, password }),
//   method: "POST",
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

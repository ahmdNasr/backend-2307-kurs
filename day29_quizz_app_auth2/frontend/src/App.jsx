import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import AuthRequired from "./components/AuthRequired";
import { backendUrl } from "./api/api";

function App() {
  const [refreshToken, setRefreshToken] = useState();
  const [token, setToken] = useState(); // aktuell verwendete accessToken
  const [user, setUser] = useState();

  console.log({ token });

  useEffect(() => {
    if (!refreshToken) return;

    function doSilentRefresh(currentAccessToken) {
      const tokenExpiration = calcTokenExpDuration(currentAccessToken); // per gegebenen token die expiration -10s berechnen

      setTimeout(async () => {
        try {
          const response = await fetch(
            `${backendUrl}/api/v1/users/refresh-token`,
            {
              method: "POST",
              headers: { authorization: `Bearer ${refreshToken}` },
            }
          );

          // if(!data.result) navigate("/login")

          const data = await response.json();
          setToken(data.result.newAccessToken);
          doSilentRefresh(data.result.newAccessToken); // rekursion (eine funktion sich selbst aufruft)
        } catch (err) {
          // error handling
          console.log(err);
          navigate("/login");
        }
      }, tokenExpiration);
    }

    function calcTokenExpDuration(accessToken) {
      const tokenPayloadBase64 = accessToken.split(".")[1];
      const tokenPayloadJson = atob(tokenPayloadBase64);
      const tokenPayload = JSON.parse(tokenPayloadJson);
      const duration = tokenPayload.exp - tokenPayload.iat;
      const nextFetchAfter = duration - 30;
      return nextFetchAfter * 1000;
    }

    doSilentRefresh(token);
  }, [refreshToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verifyEmail/:userId" element={<VerifyEmailPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setToken={setToken}
              setRefreshToken={setRefreshToken}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRequired token={token}>
              <DashboardPage token={token} user={user} />
            </AuthRequired>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

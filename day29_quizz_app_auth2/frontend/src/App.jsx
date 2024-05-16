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
  const [token, setToken] = useState(); // aktuell verwendete accessToken
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verifyEmail/:userId" element={<VerifyEmailPage />} />
        <Route
          path="/login"
          element={<LoginPage setToken={setToken} setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <DashboardPage token={token} user={user} />
            </AuthRequired>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

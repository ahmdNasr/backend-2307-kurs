import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import AuthRequired from "./components/AuthRequired";

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  console.log({ token });

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

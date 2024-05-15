import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";

const VerifyEmailPage = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userId } = useParams();

  const verifyUserEmail = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/verifyEmail`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ userId, sixDigitCode }),
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    setErrorMessage("");
    setSuccessMessage(data.result.message);
    console.log(data);
  };
  return (
    <main>
      <h1>Verify Email</h1>
      <form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <label htmlFor="sixDigitCode">Six Digit Code</label>
          <input
            id="sixDigitCode"
            type="text"
            value={sixDigitCode}
            onChange={(e) => setSixDigitCode(e.target.value)}
          />
        </div>

        <button onClick={verifyUserEmail}>Verify Email</button>
      </form>

      {successMessage && (
        <>
          <p style={{ color: "green" }}>{successMessage}</p>
          <Link to="/login">Go to Login</Link>
        </>
      )}
    </main>
  );
};

export default VerifyEmailPage;

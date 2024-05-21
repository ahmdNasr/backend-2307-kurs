import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";

const DashboardPage = ({ token, user }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchQuizzes() {
      const res = await fetch(`${backendUrl}/api/v1/quizzes`, {
        headers: { authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data.result)
        return setErrorMessage(data.message || "Could not load quizzes");

      setQuizzes(data.result);
      setErrorMessage(""); // reset error message (zur sicherheit)
    }

    fetchQuizzes();
    // fetchUser();
  }, []);

  const navigate = useNavigate();
  const logoutUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include", // !!! nötig damit das Setzen des Refresh-Tokens auf null (im backend) übernommen wird
    });

    const data = await res.json();
    if (!data.result) return alert("Could not log out");

    navigate("/login");
  };
  return (
    <main>
      {/* <h1>Welcome back {user.firstname}</h1> */}
      <h2>Quizzio Dashboard</h2>
      <button onClick={logoutUser}>Logout</button>

      {quizzes.map((quiz) => (
        <p key={quiz._id}>{quiz.name}</p>
      ))}

      <p style={{ color: "red" }}>{errorMessage}</p>
    </main>
  );
};

export default DashboardPage;

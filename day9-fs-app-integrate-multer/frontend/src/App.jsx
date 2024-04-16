import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transaction/:tid" element={<TransactionDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

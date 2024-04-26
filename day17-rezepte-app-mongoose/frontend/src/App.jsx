import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/Main/MainPage";
import AddRezeptePage from "./pages/AddRezept/AddRezeptPage";
import EditRezeptePage from "./pages/EditRezept/EditRezeptPage";
import RezeptDetailPage from "./pages/RezeptDetail/RezeptDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/rezept/add" element={<AddRezeptePage />} />
        <Route path="/rezept/edit" element={<EditRezeptePage />} />
        <Route path="/rezept/:rezeptId" element={<RezeptDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

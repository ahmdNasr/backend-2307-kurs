import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";

import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: (
            <HomePage />
        ),
      },
      {
        path: "/cart",
        element: (
            <CartPage />
        ),
      },
      {
        path: "/login",
        element: (
            <LoginPage />
        )
      },   
    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;

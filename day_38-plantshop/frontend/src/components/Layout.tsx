import { Link, Outlet } from "react-router-dom";
import { useShopState } from "../zustand";
import LogoutButton from "./LogoutButton";

const Layout = () => {
  const { user } = useShopState();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between flex-row">
        <Link to="/">Logo</Link>
        <nav>
          {user ? (
            <p>
              Hello {user.firstname} <LogoutButton />
            </p>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer>Footer </footer>
    </div>
  );
};

export default Layout;

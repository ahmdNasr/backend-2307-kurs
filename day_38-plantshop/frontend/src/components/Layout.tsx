import { Link, Outlet } from "react-router-dom";
import { useShopState } from "../zustand";
import LogoutButton from "./LogoutButton";

const Layout = () => {
  const { user } = useShopState();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between flex-row">
        <Link to="/">Logo</Link>
        <Link to="/cart">Cart</Link>

        <nav>
          {user ? (
            <p>
              Hello {user.firstname}
              <img
                className="w-6 h-6 rounded-full"
                src={`${user.imageUrl}`}
                alt=""
              />
              <LogoutButton />
            </p>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link className="ml-2" to="/register">Register</Link>
            </>
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

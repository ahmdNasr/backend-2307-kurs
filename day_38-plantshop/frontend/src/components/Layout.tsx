import { Link } from "react-router-dom";
import { useShopState } from "../zustand";

const Layout = ({ children }) => {
  const { user } = useShopState();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between flex-row">
        <span>Logo</span>
        <nav>
          {user ? (
            <p>Hello {user.firstname}</p>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </nav>
      </header>
      <div className="flex-1">{children}</div>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;

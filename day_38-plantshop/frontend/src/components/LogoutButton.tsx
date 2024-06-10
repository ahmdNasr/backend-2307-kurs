import { useShopState } from "../zustand";
import { postlogout } from "../utils/api";

const LogoutButton = () => {
  const { setUser } = useShopState();
  const handleLogout = async () => {
    await postlogout();
    setUser(null)
  };

  return (
    <button className="bg-red-200" onClick={handleLogout}>
      Sign Out
    </button>
  );
};

export default LogoutButton;

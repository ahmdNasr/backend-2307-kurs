import { Link } from "react-router-dom";
import { backendUrl } from "../../api/api";

const RezeptCard = ({ rezept }) => {
  return (
    <Link to={`/rezept/${rezept._id}`}>
      <div className="rezept-card">
        <img src={`${backendUrl}/${rezept.bildUrl}`} alt="Rezept Cover" />
        <p>{rezept.name}</p>
      </div>
    </Link>
  );
};

export default RezeptCard;

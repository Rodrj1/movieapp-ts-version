import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(true);

  const handleOnClick = () => {
    setOpenMenu((show) => !show);
  };

  return (
    <div className="flex-header">
      <Link to="/" className="link">
        <h1 className="flex-item">ARC Fiction</h1>
      </Link>

      <i
        onClick={handleOnClick}
        className="btn-menu fa-solid fa-bars fa-fade fa-xl"
      />

      <ul className={`flex-item ${!openMenu ? "nav-menu active" : "nav-menu"}`}>
        <Link to="/movies" className="link" onClick={handleOnClick}>
          <li>Movies</li>
        </Link>
        <Link to="/tvshows" className="link" onClick={handleOnClick}>
          <li>TV shows</li>
        </Link>
        <Link to="/lists" className="link" onClick={handleOnClick}>
          <li>Lists</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;

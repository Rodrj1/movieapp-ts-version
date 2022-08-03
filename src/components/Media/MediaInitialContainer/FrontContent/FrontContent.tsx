import { Link } from "react-router-dom";

const FrontContent = () => {
  return (
    <div className="front-content">
      <h1 className="front-item">
        GET STARTED AND LOOK FOR <br />
        TRENDING{" "}
        <Link to="/movies" className="front-link">
          <span className="front-span">MOVIES</span>
        </Link>{" "}
        AND{" "}
        <Link to="/tvshows" className="front-link">
          <span className="front-span">TV SHOWS</span>.
        </Link>
        <br />
      </h1>
      <h2 className="front-item">
        OR LOOK what's trending.
      </h2>

      <i className="front-item fa-solid fa-arrow-down fa-fade fa-2xl"></i>
    </div>
  );
};

export default FrontContent;

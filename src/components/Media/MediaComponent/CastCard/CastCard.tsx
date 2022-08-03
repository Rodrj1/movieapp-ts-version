import { PersonProps } from "../../../../types";
import "./CastCard.css";

const CastCard = ({ cast }: PersonProps) => {

  return (
    <div className="cast-card">
      {cast?.profile_path != null ? (
        <img src={`https://image.tmdb.org/t/p/original${cast?.profile_path}`} />
      ) : (
        <i className="fa-solid fa-circle-question"></i>
      )}
      <h1>{cast?.name}</h1>
      <p>Played: {cast?.character}</p>
      <p>{cast?.known_for_department}</p>
    </div>
  );
};

export default CastCard;

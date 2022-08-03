import FunctionalButton from "../../../buttons/FunctionalButton";
import { Link } from "react-router-dom";
import { MediaCardProps } from "../../../../types";
import "./MediaCard.css";

const MediaCard = ({ mediaCard }: MediaCardProps) => {
  const TITLE = mediaCard?.title;
  const ALT_TITLE = mediaCard?.original_title;
  const POSTER_URL = `https://image.tmdb.org/t/p/w500/${mediaCard?.poster_path}`;
  const TV_SHOW_TITLE = mediaCard?.name;
  const LINK_ID = mediaCard?.id;

  // Only if it is a MediaCard in a user list.
  const MOVIE_UUID = mediaCard?.uuid;
  const mediaType = mediaCard?.title ? "MOVIE" : "TV SHOW";
  //

  return (
    <>
      {mediaCard ? (
        <div className="card">
          <Link
            to={
              mediaCard?.original_title ? `/movie/${LINK_ID}` : `/tv/${LINK_ID}`
            }
          >
            {mediaCard?.poster_path != null ? (
              <img src={POSTER_URL} alt={ALT_TITLE} />
            ) : (
              <img
                src={require("../../../../placeholder.png")}
                alt={ALT_TITLE}
              />
            )}
          </Link>
          <h1>{TITLE ? TITLE : TV_SHOW_TITLE}</h1>
          {MOVIE_UUID ? (
            <FunctionalButton
              fn={mediaCard.onRemove}
              id={MOVIE_UUID}
              text={`DELETE ${mediaType}`}
              btnClass="list-button"
            />
          ) : null}
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
};

export default MediaCard;

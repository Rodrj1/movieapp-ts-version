import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowCategorizerProps } from "../../../../types";

const h1Style: React.CSSProperties = {
  textAlign: "center",
  color: "white",
  marginBottom: "50px",
};

const AiringToday = ({ categorizerArrow }: ArrowCategorizerProps) => {
  const [index, setIndex] = useState<number>(0);
  console.log(categorizerArrow.media);

  const shows: number | undefined =
    categorizerArrow?.media != undefined
      ? categorizerArrow?.media?.length
      : undefined;

  const SHOW_NAME: string | undefined =
    categorizerArrow?.media != undefined
      ? categorizerArrow?.media[index]?.name
      : undefined;

  const SHOW_DESCRIPTION: string | undefined =
    categorizerArrow?.media != undefined
      ? categorizerArrow?.media[index]?.overview
      : undefined;

  const SHOW_POSTER: string | undefined =
    categorizerArrow?.media != undefined
      ? `https://image.tmdb.org/t/p/w500/${categorizerArrow?.media[index]?.poster_path}`
      : `${require("../../../../placeholder.png")}`;

  const SHOW_AIR_DATE: string | undefined =
    categorizerArrow?.media != undefined
      ? categorizerArrow?.media[index]?.first_air_date
      : undefined;

  const SHOW_LINK_ID: number | undefined =
    categorizerArrow?.media != undefined
      ? categorizerArrow?.media[index]?.id
      : undefined;

  const handleIncIndex: React.MouseEventHandler<HTMLElement> = () => {
    setIndex((index) => index + 1);
  };

  const handleDecIndex: React.MouseEventHandler<HTMLElement> = () => {
    setIndex((index) => index - 1);
  };

  return (
    <div className="filter-body">
      <h1 style={h1Style}>Airing Today</h1>
      <div className="grid-latest-main">
        <div className="grid-latest">
          <h1>{SHOW_NAME}</h1>
          <h2>AVAILABLE {SHOW_AIR_DATE}</h2>
          <p>
            {SHOW_DESCRIPTION
              ? SHOW_DESCRIPTION
              : "Show still needs a description from provider."}
          </p>
        </div>
        <div className={`grid-latest`}>
          <Link to={`/tv/${SHOW_LINK_ID}`}>
            <img src={SHOW_POSTER} />
          </Link>
        </div>
      </div>
      <div className="grid-latest-arrow">
        {index > 0 && (
          <i
            onClick={handleDecIndex}
            className="fa-solid fa-chevron-left fa-xl"
          />
        )}
        {shows && (
          <>
            {index < shows - 1 && (
              <i
                onClick={handleIncIndex}
                className="fa-solid fa-chevron-right fa-xl"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AiringToday;

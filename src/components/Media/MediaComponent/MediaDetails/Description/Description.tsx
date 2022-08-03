import PosterImage from "./PosterImage";
import YoutubeTrailer from "./YoutubeTrailer";
import UserLists from "./UserLists";
import { DescriptionProps } from "../../../../../types";
import { useState } from "react";

const Description = ({ description }: DescriptionProps) => {
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);

  return (
    <>
      <PosterImage
        POSTER={description.POSTER}
        TITLE_ALT={description.TITLE_ALT}
      />

      <div className="flex-details-item flex-description">
        <a title="Visit Homepage" href={description.HOMEPAGE} target="_blank">
          VISIT OFFICIAL WEBSITE <i className="fas fa-link" />
        </a>

        <YoutubeTrailer
          trailer={description.TRAILER}
          playTrailer={playTrailer}
          setPlayTrailer={setPlayTrailer}
        />

        <UserLists type={description.type} playTrailer={playTrailer} />

        <h1>{description.TITLE}</h1>
        <p>{description.GENRES}</p>
        {description?.type ? (
          <h3>
            {description.RELEASE_OR_FIRST_EPISODE} -{" "}
            {description.DURATION_OR_LAST_EPISODE} minutes.
          </h3>
        ) : (
          <h3>
            {description.RELEASE_OR_FIRST_EPISODE} -{" "}
            {description.DURATION_OR_LAST_EPISODE}.
          </h3>
        )}
        <h3>
          <i className="fa-solid fa-star" />
          {description.RATING}
        </h3>
        <h3>Overview</h3>
        <p>
          {description.OVERVIEW
            ? description.OVERVIEW
            : "It does not have a description yet."}
        </p>
      </div>
    </>
  );
};

export default Description;

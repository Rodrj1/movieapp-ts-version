import { formatLanguage } from "../../../../functions/formatLanguage";
import { MediaDetailsUIProps } from "../../../../types";
import { v4 as uuid } from "uuid";
import Description from "./Description/Description";
import Loader from "../../../Loader/Loader";
import CastCard from "../CastCard/CastCard";
import ReviewUI from "./Review/ReviewUI";
import MediaCard from "../MediaCard/MediaCard";
import Backdrop from "./Backdrop/Backdrop";
import "./MediaDetailsUI.css";

const regexPrice = /\B(?=(\d{3})+(?!\d))/g;

const MediaDetailsUI = ({ detailProps }: MediaDetailsUIProps) => {
  const CHAPTERS = detailProps?.number_of_episodes;
  const SEASONS = detailProps?.number_of_seasons;
  const DATE_LAST_AIRED = `Last aired in: ${detailProps?.last_air_date}`;
  const BUDGET = detailProps.budget?.toString().replace(regexPrice, ",");
  const REVENUE = detailProps.revenue?.toString().replace(regexPrice, ",");
  const DURATION = detailProps?.runtime;
  const LANG_FORMATTED= formatLanguage(detailProps?.original_language);
  const POSTER_URL = `https://image.tmdb.org/t/p/w500/${detailProps.poster_path}`;
  const TITLE = detailProps?.title ? detailProps?.title : detailProps?.name;

  const MOVIE_TRAILER = detailProps?.videos?.results?.find(
    (video) => video.name === "Official Trailer"
  );
  const TV_TRAILER = detailProps?.videos?.results?.find(
    (video) => video.official === true
  );

  const MOVIE_TRAILER_OR_TV_TRAILER = MOVIE_TRAILER
    ? MOVIE_TRAILER
    : TV_TRAILER;

  const RELEASE_OR_FIRST_EPISODE = detailProps?.release_date
    ? `Release: ${detailProps?.release_date}`
    : `Aired in: ${detailProps?.first_air_date}`;

  const DURATION_OR_LAST_EPISODE = DURATION ? DURATION : DATE_LAST_AIRED;

  const MEDIA_GENRES = detailProps?.genres?.map((genre, index) => {
    if (detailProps?.genres?.length != index + 1) {
      return `${genre.name}, `;
    } else {
      return `${genre.name}.`;
    }
  });

  const MEDIA_CAST = detailProps?.credits?.cast?.map((cast) => (
    <CastCard
      key={cast.id}
      cast={{
        name: cast.name,
        known_for_department: cast.known_for_department,
        character: cast.character,
        profile_path: cast.profile_path,
      }}
    />
  ));

  const MEDIA_REVIEWS = detailProps?.reviews?.results?.map((review) => (
    <ReviewUI
      key={review.id}
      review={{
        name: review?.author_details?.name,
        username: review?.author_details?.username,
        content: review?.content,
        rating: review?.rating,
        created_at: review?.created_at,
      }}
    />
  ));
  
  const MEDIA_IMAGES = detailProps?.images?.backdrops?.map((image) => (
    <Backdrop key={image.file_path} file_path={image.file_path} />
  ));

  const MEDIA_SIMILAR = detailProps?.similar?.results?.map((similar) => (
    <MediaCard
      mediaCard={{
        title: similar.title,
        original_title: similar.original_title,
        poster_path: similar.poster_path,
        name: similar.name,
        id: similar.id,
      }}
      key={uuid()}
    />
  ));

  return (
    <>
      <div className="flex-details">
        {POSTER_URL && TITLE ? (
          <Description
            description={{
              POSTER: POSTER_URL,
              TITLE_ALT: detailProps.original_title,
              TITLE: detailProps.title,
              GENRES: MEDIA_GENRES,
              RELEASE_OR_FIRST_EPISODE: RELEASE_OR_FIRST_EPISODE,
              DURATION_OR_LAST_EPISODE: DURATION_OR_LAST_EPISODE,
              RATING: detailProps?.rating,
              OVERVIEW: detailProps?.overview,
              TRAILER: MOVIE_TRAILER_OR_TV_TRAILER,
              HOMEPAGE: detailProps?.homepage,
              type: detailProps,
            }}
          />
        ) : (
          <Loader />
        )}
      </div>
      <div className="main-separator">
        <div className="flex-cast">
          <div className="flex-cast-item flex-column-container">
            <h1>Top Cast</h1>
            <div className="flex-cast-container">{MEDIA_CAST}</div>
          </div>

          <div className="flex-cast-item flex-description-2">
            <div className="flex-desc-item-2">
              <h3>Original Language</h3>
              <p>{LANG_FORMATTED}</p>
            </div>
            <div className="flex-desc-item-2">
              <h3>{BUDGET ? "Budget" : "Seasons"}</h3>
              <p>{BUDGET ? `$${BUDGET}` : SEASONS}</p>
            </div>
            <div className="flex-desc-item-2">
              <h3>{REVENUE ? "Revenue" : "Chapters"}</h3>
              <p>{REVENUE ? `$${REVENUE}` : CHAPTERS}</p>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: "20px", width: "88%" }}
          className="filter-main-page"
        >
          <h1>
            {detailProps?.title
              ? "Similar movies you might like..."
              : "Watch these similar TV shows!"}
          </h1>
          <div className="filter-main-page-container">{MEDIA_SIMILAR}</div>
        </div>

        <div className="flex-review-container">
          <div className="flex-column-container">
            <h1>What do people think?</h1>
            {MEDIA_REVIEWS}
          </div>
        </div>

        <div className="flex-backdrop-container">
          <div className="flex-column-container">
            <h1>View all backdrops</h1>
            <div className="flex-image-container">
              {MEDIA_IMAGES}
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default MediaDetailsUI;

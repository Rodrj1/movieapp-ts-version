import MediaCard from "../MediaComponent/MediaCard/MediaCard";
import { movieGenres, tvGenres } from "../../../data/genreData";
import FunctionalButton from "../../buttons/FunctionalButton";
import { v4 as uuid } from "uuid";
import SeparatorDetails from "../../Separator/SeparatorDetails";
import "./MediaSearcherUI.css";
import { MediaCardProps } from "../../../types";

interface MediaSearcherUIProps {
  mediaData: MediaCardProps["mediaCard"][];
  media: string;
  handleOnSubmit: React.FormEventHandler<HTMLFormElement>;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  handleOnClick: (id: string | number) => void | null | undefined;
}

const MediaSearcherContainerUI = ({
  mediaData,
  media,
  handleOnSubmit,
  handleOnChange,
  handleOnClick,
}: MediaSearcherUIProps) => {
  let getGenreData = [];

  const GENRE_FILTERS =
    media == "movie"
      ? (getGenreData = movieGenres?.map((genre) => (
          <FunctionalButton
            key={genre.name}
            id={genre.id}
            fn={handleOnClick}
            btnClass="genre-button"
            text={genre.name}
          />
        )))
      : (getGenreData = tvGenres?.map((genre) => (
          <FunctionalButton
            key={genre.name}
            id={genre.id}
            fn={handleOnClick}
            btnClass="genre-button"
            text={genre.name}
          />
        )));

  const MOVIE_CARDS = mediaData?.map((movie) => (
    <MediaCard
      key={uuid()}
      mediaCard={{
        title: movie.title,
        original_title: movie.original_title,
        poster_path: movie.poster_path,
        name: movie.name,
        id: movie.id,
        uuid: movie.uuid,
      }}
    />
  ));

  const mainH1Description: string =
    media == "movie"
      ? "OR SEARCH YOURSELF FOR YOUR FAVORITE MOVIES!"
      : "OR SEARCH YOURSELF FOR YOUR FAVORITE TV SHOWS!";

  const placeholderDescription: string =
    media == "movie" ? "Search for Movie..." : "Search for TV show...";

  return (
    <div className="movie-column-container">
      <SeparatorDetails classProp="separator-to-bottom" />
      <form onSubmit={handleOnSubmit} className="search-movie-container">
        <h1 className="search-item">{mainH1Description}</h1>
        <input
          className="search search-item"
          type="search"
          placeholder={placeholderDescription}
          onChange={handleOnChange}
        />
      </form>
      <SeparatorDetails classProp="separator-to-bottom" />
      <div className="genres-container">{GENRE_FILTERS}</div>
      <div className="movies-container">{MOVIE_CARDS}</div>
    </div>
  );
};

export default MediaSearcherContainerUI;

import React, { useEffect, useState } from "react";
import { useGetGenreData } from "../../../hooks/useGetGenreData";
import { MediaCardProps } from "../../../types";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaSearcherContainerUI from "./MediaSearcherContainerUI";
import CategorySearcher from "./CategorySearcher";
import SeparatorDetails from "../../Separator/SeparatorDetails";
import Loader from "../../Loader/Loader";
import "./MediaSearcher.css";

interface MediaSearcherProps {
  media: string;
  key: number;
}

const MediaSearcherContainer = ({ media }: MediaSearcherProps) => {
  const [mediaData, setMediaData] = useState<MediaCardProps["mediaCard"][]>([]);
  const [genre, setGenre] = useState<string | number>("");
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string | "">("");
  const [searchedValue, setSearchedValue] = useState<string | "">("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { mediaByGenre } = useGetGenreData({ media });

  const TV_SHOWS_URL = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&page=${page}`;

  const TV_SHOWS_SEARCH_URL = `https://api.themoviedb.org/3/search/tv?&api_key=1d2291efea2e84d18b938ffde00ff81b&query=${searchValue}&page=${page}`;

  const TV_SHOWS_GENRES_URL = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=`;

  const MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&page=${page}`;

  const MOVIES_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?&api_key=1d2291efea2e84d18b938ffde00ff81b&query=${searchedValue}&page=${page}`;

  const MOVIES_GENRES_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchedValue == "" && genre == "") {
      const fetchMovies = async () => {
        try {
          const mediaType: string =
            media == "movie" ? MOVIES_URL : TV_SHOWS_URL;
          const getMediaData = await axios.get(mediaType);
          setMediaData((prevMovies) =>
            prevMovies.concat(getMediaData.data.results)
          );
          setHasMore(getMediaData.data.page < getMediaData.data.total_pages);
        } catch (e) {
          console.log(e, "Error fetching Movie/Movies in MoviesContainer.");
        }
      };
      fetchMovies();
    } else if (searchedValue != "" && genre == "") {
      const fetchMovies = async () => {
        try {
          const mediaType: string =
            media == "movie" ? MOVIES_SEARCH_URL : TV_SHOWS_SEARCH_URL;
          const getMediaData = await axios.get(mediaType);
          setMediaData((prevMovies) =>
            prevMovies.concat(getMediaData.data.results)
          );
          setHasMore(getMediaData.data.page < getMediaData.data.total_pages);
        } catch (e) {
          console.log(
            e,
            "Error fetching Movie/Movies by searching in MoviesContainer."
          );
        }
      };
      fetchMovies();
    }
  }, [searchedValue, page]);

  useEffect(() => {
    if (genre != "") {
      const fetchMovies = async () => {
        try {
          const mediaType: string =
            media == "movie" ? MOVIES_GENRES_URL : TV_SHOWS_GENRES_URL;
          const getMediaData = await axios.get(
            mediaType + genre + `&page=${page}`
          );
          setMediaData((prevMovies) =>
            prevMovies.concat(getMediaData.data.results)
          );
          setHasMore(getMediaData.data.page < getMediaData.data.total_pages);
        } catch (e) {
          console.log(
            e,
            "Error fetching Movie/Movies by genre in MoviesContainer."
          );
        }
      };
      fetchMovies();
    }
  }, [genre, page]);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const handleOnSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setGenre("");
    setSearchedValue(searchValue);
    setHasMore(true);
    setMediaData([]);
    setPage((current) => current - current + 1);
  };

  const handleOnClick: (id: string | number) => void | null | undefined = (
    id: string | number
  ) => {
    setGenre(id);
    setHasMore(true);
    setMediaData([]);
    setPage((current) => current - current + 1);
  };

  useEffect(() => {
    console.log(mediaData);
  }, [mediaData]);

  if (mediaData == []) {
    return <h1>Loading</h1>;
  }

  const ANIMATED_CATEGORY: string =
    media == "movie" ? "Animated Movies" : "Watch the best animated tv shows!";

  const HORROR_OR_MISTERY_CATEGORY: string =
    media == "movie"
      ? "Movies to see in the dark"
      : "Delve into the misteries of the unknown...";

  const MUSIC_OR_CRIME_CATEGORY: string =
    media == "movie"
      ? "The best Musicals that will get you to sing"
      : "Shows that will keep you watching to the end";

  const MUSIC_OR_CRIME_CATEGORY_CLASS: string =
    media == "movie" ? "music" : "crime";

  const ROMANCE_OR_ACTION_CATEGORY: string =
    media == "movie"
      ? "Check out the best Romances out there!"
      : "Grab the popcorn and watch the Action";

  return (
    <>
      {mediaData ? (
        <>
          <SeparatorDetails classProp="separator-to-header" />
          <CategorySearcher
            mediaData={mediaByGenre.animation}
            name={ANIMATED_CATEGORY}
          />
          <SeparatorDetails classProp="separator-to-bottom" />
          <CategorySearcher
            mediaData={mediaByGenre.comedy}
            name="Trending Comedies"
          />
          <SeparatorDetails classProp="separator-to-bottom" />
          <CategorySearcher
            mediaData={mediaByGenre.drama}
            name="Top Dramas you need to see"
          />
          <SeparatorDetails classProp="separator-to-bottom" />
          <CategorySearcher
            mediaData={mediaByGenre.horror}
            name={HORROR_OR_MISTERY_CATEGORY}
          />
          <SeparatorDetails classProp="separator-to-bottom" />
          <CategorySearcher
            mediaData={mediaByGenre.music}
            name={MUSIC_OR_CRIME_CATEGORY}
            extraClass01={MUSIC_OR_CRIME_CATEGORY_CLASS}
            extraClass02="music-container"
          />
          <SeparatorDetails classProp="separator-to-bottom" />
          <CategorySearcher
            mediaData={mediaByGenre.romance}
            name={ROMANCE_OR_ACTION_CATEGORY}
          />
          <SeparatorDetails classProp="separator-to-bottom" />
          <CategorySearcher
            mediaData={mediaByGenre.scifi}
            name="Break the line between fantasy and reality"
          />
          <div className="child" style={{width: "100%"}}>
            <InfiniteScroll
              dataLength={mediaData?.length}
              hasMore={hasMore}
              next={() => {
                setPage((currentPage) => currentPage + 1);
              }}
              loader={<h1>Loading</h1>}
              style={{ width: "100%" }}
            >
              <MediaSearcherContainerUI
                mediaData={mediaData}
                media={media}
                handleOnSubmit={handleOnSubmit}
                handleOnChange={handleOnChange}
                handleOnClick={handleOnClick}
              />
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MediaSearcherContainer;

import MoviesInitialContainerUI from "./MediaInitialContainerUI";
import { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { MediaCardProps } from "../../../types";

// API calls.
// ------------------------------------------------------------------------

const TRENDS_WEEKLY_URL: string = `
https://api.themoviedb.org/3/trending/all/week?api_key=1d2291efea2e84d18b938ffde00ff81b`;

const MOVIES_POPULAR_URL: string = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&page=1`;

const MOVIES_UPCOMING_URL: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=1d2291efea2e84d18b938ffde00ff81b&language=en-US&page=1`;

const MOVIES_TOP_RATED_URL: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=1d2291efea2e84d18b938ffde00ff81b&language=en-US&page=1`;

const AIRING_TODAY: string = `
https://api.themoviedb.org/3/tv/airing_today?api_key=1d2291efea2e84d18b938ffde00ff81b&language=en-US&page=1`;

// ------------------------------------------------------------------------

const MoviesInitialContainer = () => {
  const [weeklyTrends, setWeeklyTrends] = useState<
    [MediaCardProps["mediaCard"]] | undefined
  >([{}]);
  const [popularMovies, setPopularMovies] = useState<
    [MediaCardProps["mediaCard"]] | undefined
  >([{}]);
  const [upcomingMovies, setUpcomingMovies] = useState<
    [MediaCardProps["mediaCard"]] | undefined
  >([{}]);
  const [topRatedMovies, setTopRatedMovies] = useState<
    [MediaCardProps["mediaCard"]] | undefined
  >([{}]);
  const [airingToday, setAiringToday] = useState<
    [MediaCardProps["mediaCard"]] | undefined
  >([{}]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovies = async () => {
      try {
        const getWeeklyTrends = await axios.get(TRENDS_WEEKLY_URL);
        const getPopularMovies = await axios.get(MOVIES_POPULAR_URL);
        const getUpcomingMovies = await axios.get(MOVIES_UPCOMING_URL);
        const getTopRatedMovies = await axios.get(MOVIES_TOP_RATED_URL);
        const getAiringToday = await axios.get(AIRING_TODAY);
        setWeeklyTrends(getWeeklyTrends.data.results);
        setPopularMovies(getPopularMovies.data.results);
        setUpcomingMovies(getUpcomingMovies.data.results);
        setTopRatedMovies(getTopRatedMovies.data.results);
        setAiringToday(getAiringToday.data.results);
      } catch (e) {
        console.log(
          e,
          "Error fetching Movies in MoviesInitialContainer component."
        );
      }
    };
    fetchMovies();
  }, []);

  if (
    popularMovies == undefined ||
    upcomingMovies == undefined ||
    topRatedMovies == undefined ||
    weeklyTrends == undefined ||
    airingToday == undefined
  ) {
    return <h1>LOADING</h1>;
  }

  return (
    <>
      {popularMovies &&
      upcomingMovies &&
      topRatedMovies &&
      weeklyTrends &&
      airingToday ? (
        <>
          {" "}
          <div>
            <MoviesInitialContainerUI
              mediaData={{
                weekly: weeklyTrends,
                popular: popularMovies,
                upcoming: upcomingMovies,
                topRated: topRatedMovies,
                airingToday: airingToday,
              }}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MoviesInitialContainer;

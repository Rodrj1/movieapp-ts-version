import { useEffect, useState } from "react";
import axios from "axios";
import { MediaCardProps } from "../types";

interface genreDataProps {
  media: string;
}

interface mediaByGenreProps {
  data: {
    animation: MediaCardProps["mediaCard"][];
    comedy: MediaCardProps["mediaCard"][];
    drama: MediaCardProps["mediaCard"][];
    horror: MediaCardProps["mediaCard"][];
    music: MediaCardProps["mediaCard"][];
    romance: MediaCardProps["mediaCard"][];
    scifi: MediaCardProps["mediaCard"][];
  };
}

export const useGetGenreData = ({ media }: genreDataProps) => {
  const HORROR_OR_MISTERY_ID: number = media == "movie" ? 27 : 9648;
  const MUSIC_OR_CRIME_ID: number = media == "movie" ? 10402 : 80;
  const ROMANCE_OR_ACTION_ID: number = media == "movie" ? 10749 : 10759;
  const SCI_FI_ID: number = media == "movie" ? 878 : 10765;

  const MEDIA_ANIMATION: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=16`;
  const MEDIA_COMEDY: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=35`;
  const MEDIA_DRAMA: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=18`;
  const MEDIA_HORROR: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=${HORROR_OR_MISTERY_ID}`;
  const MEDIA_MUSIC: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=${MUSIC_OR_CRIME_ID}`;
  const MEDIA_ROMANCE: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=${ROMANCE_OR_ACTION_ID}`;
  const MEDIA_SCIFI: string = `https://api.themoviedb.org/3/discover/${media}?sort_by=popularity.desc&api_key=1d2291efea2e84d18b938ffde00ff81b&with_genres=${SCI_FI_ID}`;

  const [mediaByGenre, setMediaByGenre] = useState<mediaByGenreProps["data"]>({
    animation: [],
    comedy: [],
    drama: [],
    horror: [],
    music: [],
    romance: [],
    scifi: [],
  });

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const getMediaAnimation = await axios.get(MEDIA_ANIMATION);
        const getMediaComedy = await axios.get(MEDIA_COMEDY);
        const getMediaDrama = await axios.get(MEDIA_DRAMA);
        const getMediaHorror = await axios.get(MEDIA_HORROR);
        const getMediaMusic = await axios.get(MEDIA_MUSIC);
        const getMediaRomance = await axios.get(MEDIA_ROMANCE);
        const getMediaSciFi = await axios.get(MEDIA_SCIFI);
        setMediaByGenre({
          animation: getMediaAnimation.data.results,
          comedy: getMediaComedy.data.results,
          drama: getMediaDrama.data.results,
          horror: getMediaHorror.data.results,
          music: getMediaMusic.data.results,
          romance: getMediaRomance.data.results,
          scifi: getMediaSciFi.data.results,
        });
      } catch (e) {
        console.log(
          e,
          "Error fetching Movie/Movies by genre in MoviesContainer."
        );
      }
    };
    fetchMediaData();
  }, []);

  return { mediaByGenre };
};

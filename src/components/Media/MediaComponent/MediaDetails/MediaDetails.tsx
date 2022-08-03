import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MediaDetailsUIProps } from "../../../../types";
import MediaDetailsUI from "./MediaDetailsUI";
import Loader from "../../../Loader/Loader";

interface MediaDetailsProps {
  mediatype: string;
  key: string | number;
  updateMedia: React.Dispatch<React.SetStateAction<number>>;
}

const MediaDetails = ({ mediatype, updateMedia }: MediaDetailsProps) => {
  const { movieId, tvShowId } = useParams();
  const [mediaDetails, setMediaDetails] =
    useState<MediaDetailsUIProps["detailProps"]>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const LINK_ID = mediatype == "movie" ? movieId : tvShowId;

  const MEDIA_URL: string = `
  https://api.themoviedb.org/3/${mediatype}/${LINK_ID}?api_key=1d2291efea2e84d18b938ffde00ff81b&language=en-US&include_image_language&append_to_response=videos,images,credits,reviews,similar&include_image_language=en,null`;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loaded == true) {
      updateMedia((keyIndex) => keyIndex + 1);
    }
    if (loaded == false) {
      setLoaded(true);
    }
  }, [movieId, tvShowId]);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const getMedia = await axios.get(MEDIA_URL);
        setMediaDetails(getMedia.data);
      } catch (e) {
        console.log(e, "Error fetching data in MovieDetails component.");
      }
    };
    fetchMediaData();
  }, []);

  useEffect(() => {
    console.log(mediaDetails);
  }, [mediaDetails]);

  if (mediaDetails == undefined) {
    return <Loader />;
  }

  return (
    <MediaDetailsUI
      detailProps={{
        similar: mediaDetails.similar,
        credits: mediaDetails.credits,
        genres: mediaDetails.genres,
        reviews: mediaDetails.reviews,
        images: mediaDetails.images,
        videos: mediaDetails.videos,
        title: mediaDetails?.title,
        rating: mediaDetails?.rating,
        original_title: mediaDetails?.original_title,
        name: mediaDetails?.name,
        number_of_seasons: mediaDetails?.number_of_seasons,
        number_of_episodes: mediaDetails?.number_of_episodes,
        last_air_date: mediaDetails?.last_air_date,
        first_air_date: mediaDetails?.first_air_date,
        budget: mediaDetails?.budget,
        revenue: mediaDetails?.revenue,
        runtime: mediaDetails?.runtime,
        homepage: mediaDetails?.homepage,
        original_language: mediaDetails?.original_language,
        overview: mediaDetails?.overview,
        poster_path: mediaDetails?.poster_path,
        vote_average: mediaDetails?.vote_average,
        release_date: mediaDetails?.release_date,
        id: mediaDetails?.id,
      }}
    />
  );
};

export default MediaDetails;

import "./MediaInitialContainerUI.css";
import CategorizedMedia from "./CategorizedMedia/CategorizedMedia";
import SeparatorDetails from "../../Separator/SeparatorDetails";
import FrontContent from "./FrontContent/FrontContent";
import AiringToday from "./AiringToday/AiringToday";
import { MediaCardProps } from "../../../types";

interface DataProps {
  mediaData: {
    weekly?: [MediaCardProps["mediaCard"]] | undefined;
    popular?: [MediaCardProps["mediaCard"]] | undefined;
    upcoming?: [MediaCardProps["mediaCard"]] | undefined;
    topRated?: [MediaCardProps["mediaCard"]] | undefined;
    airingToday?: [MediaCardProps["mediaCard"]] | undefined;
  };
}

const MoviesInitialContainerUI = ({ mediaData }: DataProps) => {
  return (
    <>
      <SeparatorDetails classProp="separator-to-header" />
      <FrontContent />
      <SeparatorDetails classProp="separator-to-bottom" />
      <CategorizedMedia
        categorizer={{
          media: mediaData.weekly,
          type: "Movies",
          name: "Popular This Week",
          category: "weekly",
          extraClass01: "weekly",
          extraClass02: "weekly-container",
        }}
      />
      <SeparatorDetails classProp="separator-to-bottom" />
      <AiringToday
        categorizerArrow={{
          media: mediaData.airingToday,
          name: "Airing Today",
        }}
      />
      <SeparatorDetails classProp="separator-to-bottom" />
      <CategorizedMedia
        categorizer={{
          media: mediaData.popular,
          type: "Movies",
          name: "Popular Movies",
          category: "popular",
        }}
      />
      <SeparatorDetails classProp="separator-to-bottom" />
      <CategorizedMedia
        categorizer={{
          media: mediaData.upcoming,
          type: "Movies",
          name: "Upcoming Movies",
          category: "upcoming",
        }}
      />
      <SeparatorDetails classProp="separator-to-bottom" />
      <CategorizedMedia
        categorizer={{
          media: mediaData.topRated,
          type: "Movies",
          name: "Top Rated Movies",
          category: "toprated",
          extraClass01: "toprated",
          extraClass02: "toprated-container",
        }}
      />
      <SeparatorDetails classProp="separator-to-bottom" />
    </>
  );
};

export default MoviesInitialContainerUI;

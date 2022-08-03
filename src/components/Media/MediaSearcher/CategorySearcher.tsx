import MediaCard from "../MediaComponent/MediaCard/MediaCard";
import { v4 as uuid } from "uuid";
import { MediaCardProps } from "../../../types";

interface CategorySearcherProps {
  mediaData: MediaCardProps["mediaCard"][];
  name?: string;
  extraClass01?: string;
  extraClass02?: string;
}

const CategorySearcher = ({
  mediaData,
  name,
  extraClass01,
  extraClass02,
}: CategorySearcherProps) => {
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

  if (mediaData == []) {
    return <h1>Loading</h1>;
  }

  const SCI_ICON =
    name == "Break the line between fantasy and reality" ? (
      <i className="fa-solid fa-user-astronaut"></i>
    ) : null;

  return (
    <div className="category-body">
      <div className={`category-main-page ${extraClass02}`}>
        <div>
          <h1>
            {name} {SCI_ICON}
          </h1>
        </div>
        <div className={`category-main-page-container ${extraClass01}`}>
          {MOVIE_CARDS}
        </div>
      </div>
    </div>
  );
};

export default CategorySearcher;

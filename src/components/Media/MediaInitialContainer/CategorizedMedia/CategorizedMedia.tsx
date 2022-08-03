import MediaCard from "../../MediaComponent/MediaCard/MediaCard";
import { v4 as uuid } from "uuid";
import { useSwitchTvMovie } from "../../../../hooks/useSwitchTvMovie";
import { useEffect, useState } from "react";
import { CategorizerProps } from "../../../../types";
import { MediaCardProps } from "../../../../types";

const CategorizedMedia = ({ categorizer }: CategorizerProps) => {
  const { changeMediaData, changeCategoryName, refreshedData } =
    useSwitchTvMovie({ initialState: categorizer.media });

  const [currentData, setCurrentData] = useState<
    MediaCardProps["mediaCard"][] | undefined
  >(categorizer.media);
  const [currentMedia, setCurrentMedia] = useState<string>(categorizer.type);

  const [currentCategoryName, setCurrentCategoryName] = useState<
    string | undefined
  >(categorizer.name);

  const [newDataLoaded, setNewDataLoaded] = useState(false);

  const INITIAL_MOVIE_CARDS = categorizer.media?.map((movie) => (
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

  const handleMediaData = () => {
    if (categorizer.name != "Popular This Week") {
      changeMediaData(categorizer.category, currentMedia);
      const switchMedia = currentMedia == "Movies" ? "TV-Shows" : "Movies";
      setCurrentMedia(switchMedia);
      changeCategoryName(currentCategoryName, setCurrentCategoryName);
      if (newDataLoaded == false) {
        setNewDataLoaded((notLoaded) => !notLoaded);
      }
    }
  };

  useEffect(() => {
    setCurrentData(refreshedData);
  }, [refreshedData]);

  if (currentData == undefined) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="filter-body">
      <div className={`filter-main-page ${categorizer.extraClass01}`}>
        <p>{currentCategoryName}</p>
        {currentCategoryName != "Popular This Week" ? (
          <button className="category-button" onClick={handleMediaData}>
            Look for {currentMedia == "Movies" ? "TV-Shows" : "Movies"}
          </button>
        ) : null}
        <div
          className={`filter-main-page-container ${categorizer.extraClass02}`}
        >
          {!newDataLoaded
            ? INITIAL_MOVIE_CARDS
            : currentData?.map((data) => (
                <MediaCard
                  key={uuid()}
                  mediaCard={{
                    title: data.title,
                    original_title: data.original_title,
                    poster_path: data.poster_path,
                    name: data.name,
                    id: data.id,
                    uuid: data.uuid,
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CategorizedMedia;

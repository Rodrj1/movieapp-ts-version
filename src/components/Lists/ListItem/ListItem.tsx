import { useDispatch } from "react-redux";
import MediaCard from "../../Media/MediaComponent/MediaCard/MediaCard";
import FunctionalButton from "../../buttons/FunctionalButton";
import {
  removeFromList,
  removeList,
} from "../../../features/tasks/handleLists";
import { ListsProps } from "../../../types";

const ListItem = ({ listItem }: ListsProps) => {
  const dispatch = useDispatch();

  const handleRemoveList = (listId: string | number) => {
    dispatch(removeList(listId));
  };

  const handleRemoveFromList = (mediaId: string | number) => {
    dispatch(removeFromList(mediaId));
  };

  const LISTED_MOVIES = listItem.items.map((movie) => (
    <MediaCard
      key={movie.uuid}
      mediaCard={{
        title: movie.title,
        original_title: movie.original_title,
        poster_path: movie.poster_path,
        name: movie.name,
        id: movie.id,
        uuid: movie.uuid,
        onRemove: handleRemoveFromList,
      }}
    />
  ));

  return (
    <>
      <br />
      <div className="list">
        <div>
          <h1>List: {listItem.name}</h1>
          <h3>About this list: {listItem.description}</h3>
        </div>
        <div className="flex-list-container">
          <div className="listed-movies-container">{LISTED_MOVIES}</div>
        </div>
        <FunctionalButton
          fn={handleRemoveList}
          id={listItem.uuid}
          text="DELETE LIST"
          btnClass="list-button"
        />
      </div>
      <br />
    </>
  );
};

export default ListItem;

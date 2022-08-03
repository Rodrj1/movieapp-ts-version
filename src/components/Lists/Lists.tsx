import "./Lists.css";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { selectLists } from "../../features/tasks/handleLists";
import ListMaker from "./ListMaker/ListMaker";
import ListItem from "./ListItem/ListItem";
import { ListsProps } from "../../types";

const Lists = () => {
  const lists: [ListsProps["listItem"]] = useSelector(selectLists);

  const LISTS = lists.map((list: ListsProps["listItem"]) => (
    <ListItem
      listItem={{
        name: list.name,
        description: list.description,
        items: list.items,
        uuid: list.uuid,
      }}
      key={uuid()}
    />
  ));

  return (
    <div className="list-container">
      <ListMaker />

      {LISTS}
    </div>
  );
};

export default Lists;

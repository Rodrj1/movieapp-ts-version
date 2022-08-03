import "./ListMaker.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../../features/tasks/handleLists";
import { v4 as uuid } from "uuid";
import SeparatorDetails from "../../Separator/SeparatorDetails";

const ListMaker = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(createList({ ...list, items: [], uuid: uuid() }));
  };

  return (
    <>
      <SeparatorDetails classProp="separator-to-header" />
      <form className="list-maker">
        <h1>CREATE NEW LIST</h1>
        <input
          onChange={handleOnChange}
          name="name"
          type="text"
          placeholder="LIST NAME"
        />

        <textarea
          onChange={handleOnChange}
          name="description"
          placeholder="DESCRIPTION"
        />

        <button onClick={handleOnClick} className="list-button">
          SAVE LIST
        </button>
      </form>
    </>
  );
};

export default ListMaker;

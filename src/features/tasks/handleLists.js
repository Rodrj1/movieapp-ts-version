import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
};

export const handleListsSlice = createSlice({
  name: "handleLists",
  initialState,
  reducers: {
    createList: (state, action) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action) => {
      const findList = state.lists.find((list) => list.uuid === action.payload);
      if (findList) {
        state.lists.splice(state.lists.indexOf(findList), 1);
      }
    },
    addToList: (state, action) => {
      const findList = state.lists.find(
        (list) => list.uuid === action.payload.listName
      );
      if (findList) {
        const listIndex = state.lists.indexOf(findList);
        const mediaIsInList = state.lists[listIndex].items.find(
          (movie) => movie.id === action.payload.id
        );
        if (!mediaIsInList) {
          state.lists[listIndex].items.push(action.payload);
        } else {
          console.log("Already listed.");
        }
      }
    },
    removeFromList: (state, action) => {
      for (let i = 0; i < state.lists.length; i++) {
        const findFromList = state.lists[i].items.find(
          (movie) => movie.uuid === action.payload
        );
        if (findFromList) {
          state.lists[i].items.splice(
            state.lists[i].items.indexOf(findFromList),
            1
          );
        }
      }
    },
  },
});

export const { createList, removeList, addToList, removeFromList } =
  handleListsSlice.actions;

export const selectLists = (state) => state.handleLists.lists;

export default handleListsSlice.reducer;

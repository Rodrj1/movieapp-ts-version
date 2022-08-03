import { configureStore } from "@reduxjs/toolkit";
import handleListsReducer from "../features/tasks/handleLists";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, handleListsReducer);

export const store = configureStore({
  reducer: {
    handleLists: persistedReducer,
  },
  middleware: [thunk]
});

export const persistor = persistStore(store);
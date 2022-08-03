import Header from "./components/Header/Header";
import Lists from "./components/Lists/Lists";
import { useState } from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import MoviesInitialContainer from "./components/Media/MediaInitialContainer/MediaInitialContainer";
import MediaDetails from "./components/Media/MediaComponent/MediaDetails/MediaDetails";
import MediaSearcherContainer from "./components/Media/MediaSearcher/MediaSearcherContainer";
import "./App.css";

function App() {
  const [updateMovieMedia, setUpdateMovieMedia] = useState<number>(5);
  const [updateTvMedia, setUpdateTvMedia] = useState<number>(10);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="*" element={<h1>THIS PAGE DOES NOT EXIST!</h1>} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/" element={<MoviesInitialContainer />} />
            <Route path="/home" element={<MoviesInitialContainer />} />
            <Route
              path="/movie/:movieId"
              element={
                <MediaDetails
                  mediatype="movie"
                  key={updateMovieMedia}
                  updateMedia={setUpdateMovieMedia}
                />
              }
            />
            <Route
              path="/tv/:tvShowId"
              element={
                <MediaDetails
                mediatype="tv"
                key={updateTvMedia}
                updateMedia={setUpdateTvMedia}
                />
              }
            />
            <Route
              path="/movies"
              element={<MediaSearcherContainer media="movie" key={1} />}
            />
            <Route
              path="/tvshows"
              element={<MediaSearcherContainer media="tv" key={2} />}
            />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

import YouTube from "react-youtube";

interface TrailerProps {
  trailer:
    | {
        name?: string | undefined;
        official?: boolean | undefined;
        published_at: string | Date | undefined;
        id: number;
        key: string;
      }
    | undefined;
  playTrailer: boolean;
  setPlayTrailer: React.Dispatch<React.SetStateAction<boolean>>;
}

const YoutubeTrailer = ({
  trailer,
  playTrailer,
  setPlayTrailer,
}: TrailerProps) => {
  const updateTrailerState = () => {
    setPlayTrailer((play) => !play);
  };

  return (
    <>
      {trailer && playTrailer ? (
        <>
          <YouTube
            videoId={trailer.key}
            opts={{ width: "100%", height: "100%" }}
            className="youtube-trailer"
          />
          <button onClick={updateTrailerState} className="btn-trailer-on">
            <i className="fa-solid fa-circle-pause fa-2xl" /> CLOSE
          </button>
        </>
      ) : (
        <button onClick={updateTrailerState} className="btn-trailer-off">
          <i className="fa-solid fa-circle-play fa-2xl" /> Play Trailer
        </button>
      )}
    </>
  );
};

export default YoutubeTrailer;

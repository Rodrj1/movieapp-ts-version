interface PosterImageProps {
  POSTER: string | undefined;
  TITLE_ALT: string | undefined;
}

const PosterImage = ({ POSTER, TITLE_ALT }: PosterImageProps) => {
  return (
    <div className="flex-details-item">
      {POSTER ? (
        <img src={POSTER} alt={TITLE_ALT} />
      ) : (
        <img src={require("../../../../../placeholder.png")} alt={TITLE_ALT} />
      )}
    </div>
  );
};

export default PosterImage;

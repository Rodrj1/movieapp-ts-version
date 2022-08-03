import "./Backdrop.css";

interface BackdropProps {
  file_path: string;
}

const ORIGINAL_IMG_URL = `https://image.tmdb.org/t/p/original`;

const Backdrop = ({ file_path }: BackdropProps) => {
  return (
    <a
      title="See backdrop in full resolution."
      href={`${ORIGINAL_IMG_URL}${file_path}`}
      target="_blank"
      key={file_path}
    >
      {file_path != null ? (
        <img
          src={`${ORIGINAL_IMG_URL}${file_path}`}
          alt={file_path}
        />
      ) : (
        <i className="fa-solid fa-circle-question"></i>
      )}
    </a>
  );
};

export default Backdrop;

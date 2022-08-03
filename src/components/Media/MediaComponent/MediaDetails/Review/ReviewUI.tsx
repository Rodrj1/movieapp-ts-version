import "./ReviewUI.css";

interface ReviewProps {
  review: {
    name: string;
    username: string;
    content: string;
    rating: number;
    created_at: string;
  };
}

const ReviewUI = ({ review }: ReviewProps) => {
  return (
    <div className="review-container">
      <h1>
        {review?.name} - {review?.rating}{" "}
        <i className="fa-solid fa-star fa-2xs" /> {review?.created_at}
      </h1>
      <h2>username: {review?.username}</h2>
      <p>{review?.content}</p>
    </div>
  );
};

export default ReviewUI;

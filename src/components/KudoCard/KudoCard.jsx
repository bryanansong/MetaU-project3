import "./KudoCard.css";
import { useEffect, useState } from "react";

const KudoCard = ({ kudo }) => {
  const [creator, setCreator] = useState({});

  const fetchUserData = () => {
    fetch(`http://localhost:3000/users/${kudo.userId}`)
      .then((response) => response.json())
      .then((response) => setCreator(response))
      .catch((err) => console.error(err));
  };

  const handleUpvote = () => {};
  const handleDownvote = () => {};

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div
      className="kudo-card"
      // TODO: add onClick event for navigate to Kudo Card Page
      // onClick={() => openModal(movie)}
    >
      <img
        src={"https://placehold.co/260x390?text=No+Image&font=montserrat"}
        className="kudo-img"
        alt="Movie Cover Art"
      />
      <h2 className="kudo-title">{kudo.title}</h2>
      <div className="kudo-actions">
        <div className="reaction-buttons" onClick={(e) => e.stopPropagation()}>
          <button
            className="upvote"
            onClick={() => {
              handleUpvote();
            }}
          >
            ⬆️
          </button>
          <button
            className="downvote"
            onClick={() => {
              handleDownvote();
            }}
          >
            ⬇️
          </button>
        </div>
        <p className="kudo-author">{creator.username}</p>
      </div>
    </div>
  );
};

export default KudoCard;

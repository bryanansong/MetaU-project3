import "./KudoCard.css";
import { useEffect, useState } from "react";

const KudoCard = ({ kudo, refreshKudosList }) => {
  const [creator, setCreator] = useState({});
  const [likes, setLikes] = useState(0);

  const fetchUserData = () => {
    fetch(`http://localhost:3000/users/${kudo.userId}`)
      .then((response) => response.json())
      .then((response) => setCreator(response))
      .catch((err) => console.error(err));
  };

  const getAllReactions = () => {
    fetch(`http://localhost:3000/reactions/likes/${kudo.id}`)
      .then((response) => response.json())
      .then((response) => setLikes(response))
      .catch((err) => console.error(err));
  };

  // FIXME: Fix user id in here
  const handleUpvote = () => {
    fetch(`http://localhost:3000/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1,
        cardId: kudo.id,
        reactionType: "upvote",
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  // TODO: Make sure to delete all related comments and reactions
  const deleteCard = () => {
    fetch(`http://localhost:3000/cards/${kudo.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => refreshKudosList())
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUserData();
    getAllReactions();
  }, []);

  return (
    <div
      className="kudo-card"
      // TODO: add onClick event for navigate to Kudo Card Page
      // onClick={() => openModal(movie)}
    >
      <div
        className="delete-card-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteCard();
        }}
      >
        DELETE KUDO CARD
      </div>
      <img
        src={kudo?.image ? kudo.image : "https://placehold.co/260x390?text=No+Image&font=montserrat"}
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
              getAllReactions();
            }}
          >
            ⬆️ {likes}
          </button>
        </div>
        <p className="kudo-author">{creator.username}</p>
      </div>
    </div>
  );
};

export default KudoCard;

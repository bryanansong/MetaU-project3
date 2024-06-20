import "./BoardCard.css";

const BoardCard = ({ board }) => {
  return (
    <div
      className="board-card"
      // TODO: handle onClick event for opening board page
      // onClick={() => openModal(board)}
    >
      <img
        src={board.image || "https://placehold.co/260x390?text=No+Image&font=montserrat"}
        className="board-img"
        alt="Kudo Board Cover"
      />
      <div className="board-description">
        <h2 className="board-title">{board.title}</h2>
        <p className="board-author">{board.author || "Anonymous"}</p>
      </div>
    </div>
  );
};

export default BoardCard;

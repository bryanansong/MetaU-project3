import "./BoardCard.css";

const BoardCard = () => {
  return (
    <div
      className="board-card"
      // TODO: handle onClick event for opening board creation modal
      // onClick={() => openModal(movie)}
    >
      <img
        src={"https://placehold.co/260x390?text=No+Image&font=montserrat"}
        className="board-img"
        alt="Kudo Board Cover"
      />
      <div className="board-description">

      <h2 className="board-title">Kudo Board Name</h2>
      <p className="board-author">Bryan Ansong</p>
      </div>
    </div>
  );
};

export default BoardCard;

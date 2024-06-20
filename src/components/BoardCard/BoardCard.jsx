import "./BoardCard.css";

const BoardCard = ({ board, refreshBoardsList }) => {
  const deleteBoard = () => {
    fetch(`http://localhost:3000/boards/${board.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => refreshBoardsList())
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="board-card"
      // TODO: handle onClick event for opening board page
      // onClick={() => openModal(board)}
    >
      <div
        className="delete-board-button"
        onClick={(e) => {
          console.log("BOARD DELETED SUCCESSFULLY");
          e.stopPropagation();
          deleteBoard();
        }}
      >
        DELETE BOARD
      </div>
      <img
        src={
          board.image ||
          "https://placehold.co/260x390?text=No+Image&font=montserrat"
        }
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

import { useEffect, useState } from "react";
import "./BoardCard.css";

const BoardCard = ({ board, refreshBoardsList }) => {
  const [boardCategory, setBoardCategory] = useState("");

  const deleteBoard = () => {
    fetch(`http://localhost:3000/boards/${board.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => refreshBoardsList())
      .catch((err) => console.error(err));
  };

  const getCatergoryFromId = (id) => {
    fetch(`http://localhost:3000/categories/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setBoardCategory(response.name))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCatergoryFromId(board.categoryId);
  }, []);

  return (
    <div
      className="board-card"
      // TODO: handle onClick event for navigating to board page
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
          "https://placehold.co/260x290?text=No+Image&font=montserrat"
        }
        className="board-img"
        alt="Kudo Board Cover"
      />
      <div className="board-description">
        <h2 className="board-title">{board.title}</h2>
        <p className="board-author">{boardCategory}</p>
        <p className="board-author">By: {board.author || "Anonymous"}</p>
      </div>
    </div>
  );
};

export default BoardCard;

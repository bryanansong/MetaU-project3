import { useEffect, useState } from "react";
import "./BoardCard.css";
import { Link } from "react-router-dom";

const BoardCard = ({ board, refreshBoardsList }) => {
  const [boardCategory, setBoardCategory] = useState("");

  const deleteBoard = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${board.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => refreshBoardsList())
      .catch((err) => console.error(err));
  };

  const getCatergoryFromId = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/categories/${id}`, {
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
    <div className="board-card">
      <div
        className="delete-board-button"
        onClick={(e) => {
          e.stopPropagation();
          deleteBoard();
        }}
      >
        DELETE BOARD
      </div>
      <Link to={`/board/${board.id}`}>
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
      </Link>
    </div>
  );
};

export default BoardCard;

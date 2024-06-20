import { useEffect, useState } from "react";
import "./BoardList.css";
import BoardCard from "../BoardCard/BoardCard";
import AddBoardCard from "../AddBoardCard/AddBoardCard";
import AddBoardModal from "../AddBoardModal/AddBoardModal";

const BoardList = ({ category, setCategory, searchQuery }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [boardList, setBoardList] = useState([]);

  const boardListOptions = {
    search: `${searchQuery ? `/boards/search/${searchQuery}`: "/boards"}`,
    all: "/boards",
    recent: "/boards/recent",
    celebration: "/boards/categories/celebration",
    "thank-you": "/boards/categories/thank-you",
    inspiration: "/boards/categories/inspiration",
  };

  const closeModal = () => {
    setCategory("all");
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const refreshBoardsList = () => {
    fetchBoardList();
  }

  const fetchBoardList = () => {
    fetch(`http://localhost:3000${boardListOptions[category]}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setBoardList(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBoardList();
  }, [category, searchQuery]);

  return (
    <div className="board-list">
      {isVisible && (
        <AddBoardModal
          refreshBoardsList={refreshBoardsList}
          closeModal={closeModal}
        />
      )}

      {boardList.map((board, index) => (
        <div key={index}>
          <BoardCard refreshBoardsList={refreshBoardsList} board={board} />
        </div>
      ))}
      <AddBoardCard toggleModal={openModal} />
    </div>
  );
};

export default BoardList;

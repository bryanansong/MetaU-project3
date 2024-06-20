import { useEffect, useState } from "react";
import "./BoardList.css";
import BoardCard from "../BoardCard/BoardCard";
import AddBoardCard from "../AddBoardCard/AddBoardCard";
import AddBoardModal from "../AddBoardModal/AddBoardModal";

const BoardList = ({ category, searchQuery }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [boardList, setBoardList] = useState([]);
  // const [category, setCategory] = useState("all");

  const boardListOptions = {
    search: `/search/${searchQuery}`,
    all: "/boards",
    recent: "/boards/recent",
    celebration: "/boards/categories/celebration",
    "thank-you": "/boards/categories/thank-you",
    inspiration: "/boards/categories/inspiration",
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

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
      {isVisible && <AddBoardModal closeModal={closeModal} />}

      {boardList.map((board, index) => (
        <div key={index}>
          <BoardCard board={board} />
        </div>
      ))}
      <AddBoardCard toggleModal={openModal} />
    </div>
  );
};

export default BoardList;

import { useEffect, useState } from "react";
import "./BoardList.css";
import BoardCard from "../BoardCard/BoardCard";
import AddBoardCard from "../AddBoardCard/AddBoardCard";
import AddBoardModal from "../AddBoardModal/AddBoardModal";

const BoardList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [boardList, setBoardList] = useState([]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  // TODO: Create Fetch function to get all board entries
  const fetchBoardList = () => {
    fetch("http://localhost:3000/boards", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setBoardList(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBoardList();
  });

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

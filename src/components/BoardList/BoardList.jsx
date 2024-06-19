import { useState } from "react";
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

  return (
    <div className="board-list">
      {isVisible && <AddBoardModal closeModal={closeModal} />}

      {boardList.map((board, index) => (
        <div key={index}>
          <BoardCard board={board} />
        </div>
      ))}
      <AddBoardCard toggleModal={setIsVisible} />
    </div>
  );
};

export default BoardList;

import { useState } from "react";
import "./BoardList.css";
import BoardCard from "../BoardCard/BoardCard";
import AddBoardCard from "../AddBoardCard/AddBoardCard";
import AddBoardModal from "../AddBoardModal/AddBoardModal";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  // TODO: Create Fetch function to get all board entries

  return (
    <div className="board-list">
      <AddBoardModal />
      {boardList.map((board, index) => (
        <div key={index}>
          <BoardCard board={board} />
        </div>
      ))}
      <AddBoardCard />
    </div>
  );
};

export default BoardList;

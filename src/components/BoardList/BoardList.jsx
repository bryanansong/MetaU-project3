import { useState } from "react";
import BoardCard from "../BoardCard/BoardCard";
import "./BoardList.css";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  // TODO: Create Fetch function to get all board entries

  return (
    <div className="board-list">
      {boardList.map((board, index) => (
        <div key={index}>
          <BoardCard board={board} />
        </div>
      ))}
    </div>
  );
};

export default BoardList;

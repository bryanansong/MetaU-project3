import { useState } from "react";
import BoardCard from "../BoardCard/BoardCard";

const BoardList = () => {
  const boardList = useState([]);

  return (
      <div className="board-list">
        {boardList.map((board, index) => (
          // TODO: Render each Board Ard
          <></>
        ))}
      </div>
  );
};

export default BoardList;

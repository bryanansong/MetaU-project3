import { useState } from "react";
import KudoCard from "../KudoCard/KudoCard";
import "./KudoList.css";

const KudoList = () => {
  const kudoList = useState([]);

  return (
      <div className="board-list">
        {kudoList.map((kudo, index) => (
          // TODO: T192841040 Render each Board Ard
          <></>
        ))}
      </div>
  );
};

export default KudoList;

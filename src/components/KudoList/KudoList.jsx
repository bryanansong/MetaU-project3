import { useState } from "react";
import KudoCard from "../KudoCard/KudoCard";
import "./KudoList.css";

const KudoList = () => {
  const [kudoList, setKudoList] = useState([null, null, null, null, null, null]);

  // TODO: Create Fetch function to get all kudo card entries

  return (
    <div className="kudo-list">
      {kudoList.map((kudo, index) => (
        <div key={index}>
          <KudoCard kudo={kudo} />
        </div>
      ))}
      {/* TODO: Create Add Kudo Card Button */}
    </div>
  );
};

export default KudoList;

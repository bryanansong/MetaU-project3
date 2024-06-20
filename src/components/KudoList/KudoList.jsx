import { useState, useEffect } from "react";
import KudoCard from "../KudoCard/KudoCard";
import "./KudoList.css";
import AddKudoCard from "../AddKudoCard/AddKudoCard";

const KudoList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [kudoList, setKudoList] = useState([]);
  // TODO: Remove placeholder board and make it dynamic
  const board = { id: 16 };

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const refreshKudosList = () => {
    fetchBoardList();
  };

  const fetchKudosList = () => {
    fetch(`http://localhost:3000/boards/${board.id}/cards`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setKudoList(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchKudosList();
  }, []);

  return (
    <div className="kudo-list">
      {kudoList.map((kudo, index) => (
        <div key={index}>
          <KudoCard kudo={kudo} />
        </div>
      ))}
      <AddKudoCard toggleModal={openModal} />
    </div>
  );
};

export default KudoList;

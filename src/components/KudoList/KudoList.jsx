import { useState, useEffect } from "react";
import KudoCard from "../KudoCard/KudoCard";
import "./KudoList.css";
import AddKudoCard from "../AddKudoCard/AddKudoCard";
import AddKudoModal from "../AddKudoModal/AddKudoModal";

const KudoList = ({ board }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [kudoList, setKudoList] = useState([]);

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  const refreshKudosList = () => {
    fetchKudosList();
  };

  const fetchKudosList = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${board.id}/cards`, {
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
      {isVisible && (
        <AddKudoModal
          boardId={board.id}
          refreshKudosList={refreshKudosList}
          closeModal={closeModal}
        />
      )}
      {kudoList.map((kudo, index) => (
        <div key={index}>
          <KudoCard refreshKudosList={refreshKudosList} kudo={kudo} />
        </div>
      ))}
      <AddKudoCard toggleModal={openModal} />
    </div>
  );
};

export default KudoList;

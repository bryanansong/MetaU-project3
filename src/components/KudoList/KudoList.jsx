import { useState, useEffect } from "react";
import KudoCard from "../KudoCard/KudoCard";
import "./KudoList.css";
import AddKudoCard from "../AddKudoCard/AddKudoCard";
import AddKudoModal from '../AddKudoModal/AddKudoModal';
import { Link } from "react-router-dom";

const KudoList = ({board}) => {
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
      {isVisible && (
        <AddKudoModal
          boardId={board.id}
          refreshKudosList={refreshKudosList}
          closeModal={closeModal}
        />
      )}
      {kudoList.map((kudo, index) => (
        <Link to={`/kudo/${kudo.id}`} key={index}>
          <KudoCard refreshKudosList={refreshKudosList} kudo={kudo} />
        </Link>
      ))}
      <AddKudoCard toggleModal={openModal} />
    </div>
  );
};

export default KudoList;

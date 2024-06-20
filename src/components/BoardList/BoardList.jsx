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
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjdiNDBjODkyMGJjNzMyODk1MTU0M2IyM2MwMjg3YSIsInN1YiI6IjY2Njc2NDY0YTdmNzVmZDVhODFjMzAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C6GUy0On998UxcO7SY7sKs6S06ECbxQJ_Vsav1vGusw",
      },
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

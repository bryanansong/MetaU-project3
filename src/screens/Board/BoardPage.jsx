import "./BoardPage.css";
import { useEffect, useState } from "react";
import KudoList from "../../components/KudoList/KudoList";
import { useParams } from "react-router-dom";

const BoardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const board = { id: parseInt(useParams().id) };

  useEffect(() => {
    setCategory(searchQuery ? "search" : "all");
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery((prev) => (category === "search" ? prev : ""));
  }, [category]);

  useEffect(() => {
    console.log("My Boarddd: ", board);
  });

  return (
    <div className="board-page-container">
      <KudoList
        board={board}
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default BoardPage;

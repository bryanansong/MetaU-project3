import "./BoardPage.css";
import { useEffect, useState } from "react";
import KudoList from '../../components/KudoList/KudoList';

const BoardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setCategory(searchQuery ? "search" : "all");
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery((prev) => (category === "search" ? prev : ""));
  }, [category]);

  return (
    <div className="board-page-container">
      <KudoList
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default BoardPage;

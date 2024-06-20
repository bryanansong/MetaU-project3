import "./HomePage.css";
import SearchOptions from "../../components/SearchOptions/SearchOptions";
import BoardList from "../../components/BoardList/BoardList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setCategory(searchQuery ? "search" : "all");
  }, [searchQuery])

  useEffect(() => {
    setSearchQuery(prev => category === "search" ? prev : "");
  }, [category])

  return (
    <div className="searchScreen-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchOptions category={category} setCategory={setCategory} />
      <BoardList
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default HomePage;

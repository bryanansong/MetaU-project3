import "./HomePage.css";
import SearchOptions from "../../components/SearchOptions/SearchOptions";
import BoardList from "../../components/BoardList/BoardList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="searchScreen-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchOptions />
      <BoardList />
    </div>
  );
};

export default HomePage;

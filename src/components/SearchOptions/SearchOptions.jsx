import { useState } from "react";
import "./SearchOptions.css";

const SearchOptions = () => {
  const [selectedOption, setSelectedOption] = useState("all");

  return (
    <div className="search-options">
      <button
        className={`tag ${selectedOption === "all" && "active"}`}
        onClick={() => {
          setSelectedOption("all");
          console.log("pressed");
        }}
      >
        All 🌐
      </button>
      <button
        className={`tag ${selectedOption === "recent" && "active"}`}
        onClick={() => setSelectedOption("recent")}
      >
        Recent ⌛
      </button>
      <button
        className={`tag ${selectedOption === "celebration" && "active"}`}
        onClick={() => setSelectedOption("celebration")}
      >
        Celebration 🍾
      </button>
      <button
        className={`tag ${selectedOption === "thanks" && "active"}`}
        onClick={() => setSelectedOption("thanks")}
      >
        Thank You 🙏🏾
      </button>
      <button
        className={`tag ${selectedOption === "inspiration" && "active"}`}
        onClick={() => setSelectedOption("inspiration")}
      >
        Inspiration 🌈
      </button>
    </div>
  );
};

export default SearchOptions;

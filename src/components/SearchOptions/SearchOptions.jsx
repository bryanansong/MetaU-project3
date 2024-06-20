import "./SearchOptions.css";

const SearchOptions = ({category, setCategory }) => {

  return (
    <div className="search-options">
      <button
        className={`tag ${category === "all" && "active"}`}
        onClick={() => {
          setCategory("all");
          console.log("pressed");
        }}
      >
        All 🌐
      </button>
      <button
        className={`tag ${category === "recent" && "active"}`}
        onClick={() => setCategory("recent")}
      >
        Recent ⌛
      </button>
      <button
        className={`tag ${category === "celebration" && "active"}`}
        onClick={() => setCategory("celebration")}
      >
        Celebration 🍾
      </button>
      <button
        className={`tag ${category === "thank-you" && "active"}`}
        onClick={() => setCategory("thank-you")}
      >
        Thank You 🙏🏾
      </button>
      <button
        className={`tag ${category === "inspiration" && "active"}`}
        onClick={() => setCategory("inspiration")}
      >
        Inspiration 🌈
      </button>
    </div>
  );
};

export default SearchOptions;

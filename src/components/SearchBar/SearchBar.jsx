import "./SearchBar.css";
import searchLogo from "../../assets/SearchIcon.svg";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar">
      <img src={searchLogo} alt="looking-glass" height={16} width={16} />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar-input-box"
      />
    </div>
  );
};

export default SearchBar;

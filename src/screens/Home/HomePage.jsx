import "./HomePage.css";
import SearchOptions from "../../components/SearchOptions/SearchOptions";
import BoardList from "../../components/BoardList/BoardList";

const HomePage = () => {
  return (
    <div className="searchScreen-container">
      <SearchOptions />
      <h1 className="searchScreen-title">No Boards have been made</h1>
      <BoardList />
    </div>
  );
};

export default HomePage;

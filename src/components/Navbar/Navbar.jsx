import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  let navBarTitle;

  if (location.pathname.includes("/board")) {
    navBarTitle = "Boards Page";
  } else if (location.pathname.includes("/kudo")) {
    navBarTitle = "Kudo Card";
  } else {
    navBarTitle = "Home";
  }

  return (
    <div className="navbar">
      {location.pathname !== "/" && (
        <Link className="back-button" to={-1}>
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
          >
            <path
              d="M7 13L1 7L7 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
      <h1 className="navbar-title">{navBarTitle}</h1>
    </div>
  );
};

export default Navbar;

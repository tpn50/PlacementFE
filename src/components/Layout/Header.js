import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const shouldShowSignUpLink =
    location.pathname === "/" || location.pathname === "/signin";
  const shouldShowSignInLink = location.pathname === "/signup";

  const shouldShowInterviewsLink =
    location.pathname !== "/" &&
    location.pathname !== "/signup" &&
    location.pathname !== "/signin";

  return (
    <header>
      <nav>
        {shouldShowSignUpLink && <Link to="/signup">Sign Up</Link>}
        {shouldShowSignInLink && <Link to="/signin">Sign In</Link>}
        {shouldShowInterviewsLink && <Link to="/interviews">Interviews</Link>}
        {shouldShowInterviewsLink && <Link to="/students">Students</Link>}
        {shouldShowInterviewsLink && <Link to="/results">Results</Link>}
      </nav>
    </header>
  );
};

export default Header;

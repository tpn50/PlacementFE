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
    <header className="header">
      <h1 className="header__logo">Placement Portal</h1>
      <nav className="header__nav">
        {shouldShowSignUpLink && <Link to="/signup">Sign Up</Link>}
        {shouldShowSignInLink && <Link to="/signin">Sign In</Link>}
        {shouldShowInterviewsLink && <Link to="/interviews">Interviews</Link>}
        {shouldShowInterviewsLink && <Link to="/students">Students</Link>}
        {shouldShowInterviewsLink && <Link to="/results">Results</Link>}
        {shouldShowInterviewsLink && <Link to="/">Logout</Link>}
      </nav>
    </header>
  );
};

export default Header;

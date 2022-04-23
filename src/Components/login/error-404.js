import React from "react";
import Error from "../../images/error-404.svg";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <section className="error-page">
      <h2>Oops...</h2>
      <img src={Error} alt="Error" />
      <h3>Not Found</h3>
      <span>The page you requested could not be found</span>
      <Link to="/" className="done-btn">
        {" "}
        Back to home page
      </Link>
    </section>
  );
};

export default NotFound;

import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import "../css/NotFound.css";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>
        <button className="link">
          <Link to="/">Go back</Link>
        </button>
      </p>
    </div>
  );
};

NotFound.propTypes = {
  path: PropTypes.string.isRequired
};

export default NotFound;

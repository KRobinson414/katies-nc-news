import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

const BadRequest = () => {
  return (
    <div>
      <h1>Uh oh!</h1>
      <h2>Something went wrong...</h2>
      <p>
        <button className="link">
          <Link to="/">Go back</Link>
        </button>
      </p>
    </div>
  );
};

BadRequest.propTypes = {
  path: PropTypes.string.isRequired
};

export default BadRequest;

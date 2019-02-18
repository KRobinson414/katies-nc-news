import React from "react";
import PropTypes from "prop-types";

const NotFound = () => {
  return <div>NOT FOUND</div>;
};

NotFound.propTypes = {
  path: PropTypes.string.isRequired
};

export default NotFound;

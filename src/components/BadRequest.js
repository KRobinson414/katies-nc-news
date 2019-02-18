import React from "react";
import PropTypes from "prop-types";

const BadRequest = () => {
  return <div>BAD REQUEST</div>;
};

BadRequest.propTypes = {
  path: PropTypes.string.isRequired
};

export default BadRequest;

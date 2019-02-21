import React from "react";
import PropTypes from "prop-types";
import "../css/Pagination.css";

const Pagination = ({ page, hasAllItems, setPage }) => {
  return (
    <div className="pagination">
      <span id="prev-page">
        <button onClick={() => setPage(-1)} disabled={page < 2}>
          Previous
        </button>
      </span>
      <span id="next-page">
        <button onClick={() => setPage(1)} disabled={hasAllItems === true}>
          Next
        </button>
      </span>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
};

export default Pagination;

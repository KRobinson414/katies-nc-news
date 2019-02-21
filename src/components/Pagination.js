import React from "react";
import PropTypes from "prop-types";
import "../css/Pagination.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowCircleLeft";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";

library.add(faArrowCircleLeft, faArrowCircleRight);

const Pagination = ({ page, hasAllItems, setPage }) => {
  return (
    <div className="pagination">
      <span id="prev-page">
        <button onClick={() => setPage(-1)} disabled={page === 1}>
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </button>
      </span>
      <span id="next-page">
        <button onClick={() => setPage(1)} disabled={hasAllItems === true}>
          <FontAwesomeIcon icon={faArrowCircleRight} />
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

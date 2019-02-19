import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ options, onSelect }) => {
  return (
    <span>
      {options && (
        <select onChange={onSelect}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </span>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

export default Dropdown;

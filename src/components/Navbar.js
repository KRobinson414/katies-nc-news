import React, { Component } from "react";
import PropTypes from "prop-types";

export class Navbar extends Component {
  state = {
    showMenu: false
  };

  render() {
    return <div>NAVBAR</div>;
  }
}

Navbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Navbar;

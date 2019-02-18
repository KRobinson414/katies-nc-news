import React, { Component } from "react";
// import { Link } from "@reach/router";
import PropTypes from "prop-types";

export class Sidebar extends Component {
  state = {
    userText: "",
    showArticleAdder: false
  };

  render() {
    return <div>SIDEBAR</div>;
  }
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Sidebar;

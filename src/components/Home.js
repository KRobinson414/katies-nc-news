import React, { Component } from "react";
import PropTypes from "prop-types";

export class Home extends Component {
  state = {
    topics: [],
    articles: [],
    users: [],
    filterBy: "all topics",
    sortBy: "most recent"
  };

  render() {
    return <div>HOME</div>;
  }
}

Home.propTypes = {
  path: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Home;

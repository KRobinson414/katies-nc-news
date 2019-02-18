import React, { Component } from "react";
import PropTypes from "prop-types";

export class TopicAdder extends Component {
  state = {
    topics: [],
    topic: "",
    newTopic: ""
  };
  render() {
    return <div>TOPIC ADDER</div>;
  }
}

TopicAdder.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default TopicAdder;

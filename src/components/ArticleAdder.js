import React, { Component } from "react";
import PropTypes from "prop-types";

export class ArticleAdder extends Component {
  state = {
    title: "",
    body: ""
  };

  render() {
    return <div>ARTICLE ADDER</div>;
  }
}

ArticleAdder.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default ArticleAdder;

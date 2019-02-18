import React, { Component } from "react";
import PropTypes from "prop-types";

export class Article extends Component {
  state = {
    article: {},
    comments: [],
    showCommentAdder: false,
    showDelete: false
  };

  render() {
    return <div>ARTICLE</div>;
  }
}

Article.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Article;

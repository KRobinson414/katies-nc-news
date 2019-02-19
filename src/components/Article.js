import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { fetchArticleById, fetchData } from "../api";

export class Article extends Component {
  state = {
    article: {},
    comments: [],
    showCommentAdder: false,
    showDelete: false
  };

  componentDidMount() {
    const { article_id, user } = this.props;
    user &&
      fetchArticleById(article_id)
        .then(({ article }) => {
          if (user.username === article.author) {
            this.setState({ article, showDelete: true });
          } else {
            this.setState({ article });
          }
        })
        .catch(() => {
          navigate("/not-found");
        });
    fetchData(`articles/${article_id}/comments`).then(({ comments }) => {
      this.setState({ comments });
    });
  }

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

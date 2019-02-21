import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchData } from "../api";
import { Link } from "@reach/router";

export class ArticleCard extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    const { article_id } = this.props.article;
    fetchData(`articles/${article_id}/comments`).then(({ comments }) => {
      this.setState({ comments });
    });
  }

  render() {
    const { article } = this.props;
    const { comments } = this.state;
    console.log(article.avatar_url);
    return (
      <div id="article-card">
        <span className="article-card-text">
          <Link id="article-link" to={`/articles/${article.article_id}`}>
            {article.title}
          </Link>
          <div className="subtext">
            <p>{article.topic}</p>
          </div>
          <div className="sub-subtext">
            <p>{Date(article.created_at).slice(0, 21)}</p>
            <p>
              <span>votes: {article.votes}</span>
              <span>
                comments:{" "}
                {
                  comments.filter(
                    comment => comment.article_id === article.article_id
                  ).length
                }
              </span>
            </p>
          </div>
        </span>
        <span className="article-card-author">
          <img
            className="image"
            src={article.avatar_url}
            alt="Author"
            width="80%"
            height="auto"
          />
          <p>{article.author}</p>
        </span>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    article_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    comment_count: PropTypes.string.isRequired
  })
};

export default ArticleCard;

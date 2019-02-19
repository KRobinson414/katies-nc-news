import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { fetchArticleById, fetchData } from "../api";
import Auth from "./Auth";
import Vote from "./Vote";
import CommentAdder from "./CommentAdder";
import CommentCard from "./CommentCard";
import "../css/Article.css";

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
    const { article, comments, showDelete, showCommentAdder } = this.state;
    const { user, setUser } = this.props;
    const date = Date(article.created_at).slice(0, 21);

    return (
      <Auth user={user} setUser={setUser}>
        <div className="App-body">
          <div className="article-header">
            <div id="topic">{article.topic}</div>
            <Vote article_id={article.article_id} votes={article.votes} />
          </div>
          <div className="article">
            {showDelete && (
              <div className="delete">
                <button onClick={this.handleDelete}>Delete this article</button>
              </div>
            )}
            <h1>{article.title}</h1>
            <div className="author">written by {article.author}</div>
            <div className="date">{date}</div>
            {article.body}
          </div>
          <p>
            <button id="add-comment" onClick={this.toggleCommentInput}>
              Leave a comment
            </button>
          </p>
          <div className="comment-input">
            {showCommentAdder && (
              <CommentAdder
                article_id={article.article_id}
                user={user}
                updateComments={this.updateComments}
              />
            )}
          </div>
          {comments ? (
            comments.map(comment => (
              <CommentCard
                key={comment.comment_id}
                user={user}
                comment={comment}
                updateComments={this.updateComments}
              />
            ))
          ) : (
            <p>Loading comments...</p>
          )}
        </div>
      </Auth>
    );
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

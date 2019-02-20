import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { deleteItem } from "../api";
import Vote from "./Vote";

export class CommentCard extends Component {
  state = {
    showDelete: false
  };

  componentDidMount() {
    const { comment, user } = this.props;
    if (user.username === comment.author) {
      this.setState({ showDelete: true });
    }
  }

  handleDelete = event => {
    const { article_id, comment_id } = this.props.comment;
    const { updateComments } = this.props;
    event.preventDefault();
    deleteItem(article_id, comment_id).then(() => {
      updateComments();
      navigate(`/articles/${article_id}`);
      this.setState({ showDelete: false });
    });
  };

  render() {
    const { comment, user } = this.props;
    const { showDelete } = this.state;

    return (
      <div className="comment-card">
        <div id="comment-body">
          {showDelete && (
            <div className="comment-delete">
              <button onClick={this.handleDelete}>X</button>
            </div>
          )}
          <div id="comment-author">{comment.author} says...</div>
          {comment.body}
        </div>
        <div id="comment-author-image">
          <img
            className="image"
            src={comment.avatar_url}
            alt="Author"
            width="80%"
            height="auto"
          />
        </div>
        <Vote
          article_id={comment.article_id}
          votes={comment.votes}
          comment_id={comment.comment_id}
          author={comment.author}
          username={user.username}
        />
      </div>
    );
  }
}

CommentCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  comment: PropTypes.shape({
    article_id: PropTypes.number.isRequired,
    comment_id: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired
  }),
  updateComments: PropTypes.func.isRequired
};

export default CommentCard;

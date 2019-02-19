import React, { Component } from "react";
import PropTypes from "prop-types";
import { addComment } from "../api";
import { navigate } from "@reach/router/lib/history";

export class CommentAdder extends Component {
  state = {
    body: ""
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { body } = this.state;
    const { article_id, user, updateComments } = this.props;
    event.preventDefault();
    addComment(article_id, user, body)
      .then(() => {
        updateComments();
        navigate(`/articles/${article_id}`);
      })
      .then(() => {
        this.setState({ body: "" });
      });
  };

  render() {
    const { body } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          value={body}
          name="body"
          onChange={this.handleChange}
          required
          cols="30"
          rows="5"
        />
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    );
  }
}

CommentAdder.propTypes = {
  article_id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  updateComments: PropTypes.func.isRequired
};

export default CommentAdder;

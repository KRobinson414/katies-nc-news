import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { addArticle } from "../api";

export class ArticleAdder extends Component {
  state = {
    title: "",
    body: ""
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { user } = this.props;
    const { topic } = this.props.location.state;
    const { title, body } = this.state;
    event.preventDefault();
    addArticle(user, title, topic, body)
      .then(({ data }) => {
        const { article_id } = data.article;
        navigate(`articles/${article_id}`);
      })
      .catch(() => {
        navigate("bad-request");
      });
  };

  render() {
    const { topic } = this.props.location.state;
    const { title, body } = this.state;

    return (
      <div className="adder">
        <p>Topic: {topic ? topic : "coding"}</p>
        <form onSubmit={this.handleSubmit}>
          <div className="text-input">
            <label className="label">Title: </label>
            <input
              value={title}
              name="title"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="text-input">
            <label className="label">Article: </label>
            <textarea
              className="body-input"
              value={body}
              name="body"
              onChange={this.handleChange}
              required
              cols="30"
              rows="20"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
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

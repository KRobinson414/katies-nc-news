import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { fetchData, addTopic } from "../api";
import Dropdown from "./Dropdown";
import "../css/Adders.css";

export class TopicAdder extends Component {
  state = {
    topics: [],
    topic: "",
    newTopic: "",
    newTopicDes: ""
  };

  componentDidMount() {
    fetchData("topics").then(({ topics }) => {
      this.setState({ topics });
    });
  }

  handleSelect = event => {
    const { value } = event.target;
    this.setState({ topic: value });
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { topic, newTopic, newTopicDes } = this.state;
    event.preventDefault();
    if (newTopic) {
      addTopic(newTopic, newTopicDes).then(() => {
        navigate("/add-article");
      });
    } else {
      this.setState({ topic });
      navigate("/add-article");
    }
  };

  render() {
    const { topics, newTopic, newTopicDes } = this.state;

    return (
      <div className="adder">
        <h2>Add an article...</h2>
        <p>
          What's your article about? Pick an existing topic or add your own.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="label">Choose a topic:</label>
            {topics && (
              <Dropdown
                className="dropdown"
                options={[...topics.map(topic => topic.slug)]}
                onSelect={this.handleSelect}
                required
              />
            )}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <form onSubmit={this.handleSubmit}>
          <div className="new-topic">
            <label className="label">Add a new topic: </label>
            <input
              value={newTopic}
              name="newTopic"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="new-topic-des">
            <label className="label">New topic description: </label>
            <textarea
              value={newTopicDes}
              name="newTopicDes"
              onChange={this.handleChange}
              cols="40"
              rows="3"
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

TopicAdder.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default TopicAdder;

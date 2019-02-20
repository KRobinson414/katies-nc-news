import React, { Component } from "react";
import PropTypes from "prop-types";
import { changeVote } from "../api";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons/faThumbsDown";

library.add(faThumbsUp, faThumbsDown);

export class Vote extends Component {
  state = {
    voteChange: 0
  };

  handleVote = voteChange => {
    const { article_id } = this.props;
    const { comment_id } = this.props || 0;
    changeVote(article_id, voteChange, comment_id);
    this.setState({ voteChange });
  };

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;

    return (
      <div id="comment-vote">
        <button
          className="vote-button"
          disabled={voteChange > 0}
          onClick={() => this.handleVote(1)}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <p id="comment-vote-no">{votes + voteChange}</p>
        <button
          className="vote-button"
          disabled={voteChange < 0}
          onClick={() => this.handleVote(-1)}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    );
  }
}

Vote.propTypes = {
  article_id: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired
};

export default Vote;

import React, { Component } from "react";
import { navigate } from "@reach/router";
import moment from "moment";
import PropTypes from "prop-types";
import { fetchArticleById, deleteItem, fetchQueries } from "../api";
import Auth from "./Auth";
import Vote from "./Vote";
import CommentAdder from "./CommentAdder";
import CommentCard from "./CommentCard";
import Dropdown from "./Dropdown";
import Pagination from "./Pagination";
import "../css/Article.css";

export class Article extends Component {
  state = {
    article: {},
    comments: [],
    showCommentAdder: false,
    showDelete: false,
    page: 1,
    hasAllItems: false
  };

  fetchPageData = () => {
    const { article_id, user } = this.props;
    const { page, sortBy } = this.state;
    fetchArticleById(article_id)
      .then(article => {
        if (user.username === article.author) {
          this.setState({ article, isLoading: false, showDelete: true });
        } else {
          this.setState({ article, isLoading: false });
        }
      })
      .catch(() => {
        navigate("/not-found");
      });
    fetchQueries("p", page, "sort_by", sortBy, article_id).then(
      ({ comments }) => {
        this.setState({ comments });
      }
    );
  };

  componentDidMount() {
    const { user } = this.props;
    user && this.fetchPageData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    const { sortBy, page } = this.state;
    if (prevProps.user !== user) this.fetchPageData();
    if (prevState.sortBy !== sortBy || prevState.page !== page)
      this.updateComments();
  }

  updateComments = () => {
    const { article_id } = this.state.article;
    const { page, sortBy } = this.state;
    fetchQueries("p", page, "sort_by", sortBy, article_id).then(
      ({ comments }) => {
        this.setState({ comments, showCommentAdder: false });
      }
    );
  };

  toggleCommentInput = event => {
    const { showCommentAdder } = this.state;
    event.preventDefault();
    showCommentAdder
      ? this.setState({ showCommentAdder: false })
      : this.setState({ showCommentAdder: true });
  };

  handleDelete = event => {
    const { article_id } = this.state.article;
    event.preventDefault();
    deleteItem(article_id, null).then(() => navigate("/"));
  };

  handleCommentSort = event => {
    const { value } = event.target;
    const lookup = {
      "most recent": "created_at",
      "most popular": "votes"
    };
    this.setState({ sortBy: lookup[value] });
  };

  setPage = direction => {
    this.setState(prevState => {
      return {
        page: prevState.page + direction
      };
    });
  };

  render() {
    const {
      article,
      comments,
      showDelete,
      showCommentAdder,
      page,
      hasAllItems
    } = this.state;
    const { user, setUser } = this.props;

    return (
      <Auth user={user} setUser={setUser}>
        {user && (
          <div className="App-body">
            <div className="article-header">
              <div id="topic">{article.topic}</div>
              {article.article_id && (
                <Vote
                  article_id={article.article_id}
                  author={article.author}
                  votes={article.votes}
                  username={user.username}
                />
              )}
            </div>
            <div className="article">
              {showDelete && (
                <div className="delete">
                  <button onClick={this.handleDelete}>
                    Delete this article
                  </button>
                </div>
              )}
              <h1>{article.title}</h1>
              <div className="author">written by {article.author}</div>
              <div className="date">
                {moment(article.created_at).format("dddd Do MMMM YYYY, h:mm a")}
              </div>
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
            <div className="sort">
              Sort by:
              <Dropdown
                className="dropdown"
                options={["", "most recent", "most popular"]}
                onSelect={this.handleCommentSort}
              />
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

            {/* Work in progress */}
            <Pagination
              page={page}
              hasAllItems={hasAllItems}
              setPage={this.setPage}
            />
          </div>
        )}
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

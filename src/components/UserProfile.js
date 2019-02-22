import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchArticlesByUsername } from "../api";
import ArticleCard from "./ArticleCard";
import Dropdown from "./Dropdown";
import "../css/UserProfile.css";

export class UserProfile extends Component {
  state = {
    articles: [],
    isLoading: true,
    isOwnProfile: false,
    sortBy: "created_at"
  };

  fetchArticleData = (username, query) => {
    const { user } = this.props;
    fetchArticlesByUsername(username, query).then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
    if (user && user.username === username) {
      this.setState({ isOwnProfile: true });
    }
  };

  componentDidMount() {
    const { username } = this.props;
    this.fetchArticleData(username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { username } = this.props;
    const { sortBy } = this.state;
    if (prevProps.username !== username) {
      this.fetchArticleData(username);
    }
    if (prevState.sortBy !== sortBy) {
      this.fetchArticleData(username, sortBy);
    }
  }

  totalArticleVotes = () => {
    const { articles } = this.state;
    return articles.reduce((total, article) => {
      return total + article.votes;
    }, 0);
  };

  totalArticleComments = () => {
    const { articles } = this.state;
    return articles.reduce((total, article) => {
      return total + Number(article.comment_count);
    }, 0);
  };

  handleSort = event => {
    const { value } = event.target;
    const lookup = {
      "most recent": "created_at",
      "most popular": "votes",
      "most comments": "comment_count"
    };
    const query = lookup[value];
    this.setState({ sortBy: query });
  };

  render() {
    const { articles, isLoading } = this.state;
    const { username } = this.props;
    if (isLoading) return <h3>Loading user profile...</h3>;

    return (
      <div className="App-body">
        <h1 className="header">{username}</h1>
        <div className="userStats">
          <span>total articles: {articles && articles.length}</span>
          <span>
            total article votes: {articles && this.totalArticleVotes()}
          </span>
          <span>
            total articles comments: {articles && this.totalArticleComments()}
          </span>
        </div>
        <div>
          Sort by:
          <Dropdown
            className="dropdown"
            options={["most recent", "most popular", "most comments"]}
            onSelect={this.handleSort}
          />
        </div>
        <div>
          {articles &&
            articles.map(article => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default UserProfile;

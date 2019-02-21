import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchArticlesByUsername } from "../api";
import ArticleCard from "./ArticleCard";
import "../css/UserProfile.css";

export class UserProfile extends Component {
  state = {
    articles: [],
    isLoading: true,
    isOwnProfile: false
  };

  fetchPageData = username => {
    const { user } = this.props;
    fetchArticlesByUsername(username).then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
    if (user && user.username === username) {
      this.setState({ isOwnProfile: true });
    }
  };

  componentDidMount() {
    const { username } = this.props;
    this.fetchPageData(username);
  }

  componentDidUpdate(prevProps) {
    const { username } = this.props;
    if (prevProps.username !== username) {
      this.fetchPageData(username);
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

  setPage = direction => {
    const { username } = this.props;
    const { page } = this.state;
    this.setState({ page: page + direction });
    this.fetchPageData(username);
  };

  render() {
    const { articles, isLoading, page, hasAllItems } = this.state;
    const { username } = this.props;
    if (isLoading) return <h3>Loading user profile...</h3>;

    return (
      <div className="App-body">
        <h1 className="header">{username}</h1>
        <div>
          <span>total articles: {articles && articles.length}</span>
          <span>
            total article votes: {articles && this.totalArticleVotes()}
          </span>
          <span>
            total articles comments: {articles && this.totalArticleComments()}
          </span>
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

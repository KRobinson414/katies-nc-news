import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchData } from "../api";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import "../css/UserProfile.css";

export class UserProfile extends Component {
  state = {
    articles: [],
    isLoading: true,
    isOwnProfile: false,
    page: 1,
    hasAllItems: false
  };

  componentDidMount() {
    const { user, username } = this.props;
    fetchData("articles").then(({ articles }) => {
      const userArticles = articles.filter(
        article => article.author === username
      );
      this.setState({ articles: userArticles, isLoading: false });
    });
    if (user && user.username === username) {
      this.setState({ isOwnProfile: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { user, username } = this.props;
    if (prevProps.username !== username) {
      fetchData("articles").then(({ articles }) => {
        const userArticles = articles.filter(
          article => article.author === username
        );
        this.setState({ articles: userArticles, isLoading: false });
      });
      if (user && user.username === username) {
        this.setState({ isOwnProfile: true });
      }
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
    const { page } = this.state;
    this.setState({ page: page + direction });
  };

  render() {
    const { articles, isLoading, page, hasAllItems } = this.state;
    const { username } = this.props;
    if (isLoading) return <h3>Loading user profile...</h3>;

    return (
      <div className="App-body">
        <h1 className="header">{username}</h1>
        <div>
          <span>total articles: {articles.length}</span>
          <span>total article votes: {this.totalArticleVotes()}</span>
          <span>total articles comments: {this.totalArticleComments()}</span>
        </div>
        <div>
          {articles &&
            articles.map(article => (
              <ArticleCard key={article.article_id} article={article} />
            ))}
          <Pagination
            page={page}
            hasAllItems={hasAllItems}
            setPage={this.setPage}
          />
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

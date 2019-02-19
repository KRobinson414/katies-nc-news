import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchData } from "../api";
import Dropdown from "./Dropdown";
import ArticleCard from "./ArticleCard";
import "../css/Home.css";

export class Home extends Component {
  state = {
    topics: [],
    articles: [],
    filterBy: "all topics",
    sortBy: "most recent"
  };

  componentDidMount() {
    fetchData("topics").then(({ topics }) => {
      this.setState({ topics });
    });
    fetchData("articles").then(({ articles }) => {
      this.setState({ articles });
    });
  }

  handleFilter = event => {
    const { value } = event.target;
    const { articles, filterBy } = this.state;
    this.setState({ filterBy: value });
    articles.filter(article => article.slug === filterBy);
  };

  // handleSort = event => {
  //   const { value } = event.target;
  //   const { articles, sortBy } = this.state;
  //   this.setState({ sortBy: value });
  // };

  render() {
    const { articles, topics, filterBy } = this.state;
    const chosenArticles = articles
      ? filterBy === "all topics"
        ? articles
        : articles.filter(article => article.topic === filterBy)
      : "";

    return (
      <div className="App-body">
        <h1 className="header">Welcome to NC News!</h1>
        <div>
          <span className="filter">
            Filter by:
            <Dropdown
              className="dropdown"
              options={["all topics", ...topics.map(topic => topic.slug)]}
              onSelect={this.handleFilter}
            />
          </span>
          <span className="sort">
            Sort by:
            <Dropdown
              className="dropdown"
              options={["created_at", "votes", "comment_count"]}
              onSelect={this.handleSort}
            />
          </span>
        </div>
        {articles ? (
          chosenArticles.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  path: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Home;

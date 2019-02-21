import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchData, fetchQueries, fetchArticleByTopic } from "../api";
import Dropdown from "./Dropdown";
import ArticleCard from "./ArticleCard";
import "../css/Home.css";
import { navigate } from "@reach/router/lib/history";

export class Home extends Component {
  state = {
    topics: [],
    articles: [],
    filterBy: "all topics",
    isLoading: true
  };

  componentDidMount() {
    fetchData("topics").then(({ topics }) => {
      this.setState({ topics });
    });
    fetchData("articles").then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
  }

  handleFilter = event => {
    const { value } = event.target;
    if (value !== "all topics") {
      fetchArticleByTopic(value)
        .then(({ articles }) => {
          this.setState({ articles, isLoading: false });
        })
        .catch(() => {
          navigate("/not-found");
        });
    } else {
      fetchData("articles").then(({ articles }) => {
        this.setState({ articles, isLoading: false });
      });
    }
  };

  handleSort = event => {
    const { value } = event.target;
    const lookup = {
      "most recent": "created_at",
      "most popular": "votes",
      "most comments": "comment_count"
    };
    const query = lookup[value];
    fetchQueries("sort_by", query).then(({ articles }) => {
      this.setState({ articles });
    });
  };

  render() {
    const { articles, topics, isLoading } = this.state;
    if (isLoading) return <h3>Loading articles...</h3>;

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
              options={["most recent", "most popular", "most comments"]}
              onSelect={this.handleSort}
            />
          </span>
        </div>
        {articles &&
          articles.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
      </div>
    );
  }
}

Home.propTypes = {
  path: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Home;

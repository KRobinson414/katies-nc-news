import React, { Component } from "react";
import { navigate } from "@reach/router/lib/history";
import PropTypes from "prop-types";
import { fetchData, fetchQueries, fetchArticlesByTopic } from "../api";
import Dropdown from "./Dropdown";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";
import "../css/Home.css";

export class Home extends Component {
  state = {
    topics: [],
    articles: [],
    filterBy: "all topics",
    sortBy: "created_at",
    isLoading: true,
    page: 1,
    hasAllItems: false
  };

  componentDidMount() {
    fetchData("topics").then(({ topics }) => {
      this.setState({ topics });
    });
    fetchData("articles").then(({ articles }) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { articles, filterBy, sortBy, page } = this.state;

    if (
      prevState.page !== page ||
      prevState.sortBy !== sortBy ||
      prevState.filterBy !== filterBy
    ) {
      if (filterBy === "all topics") {
        console.log("here");
        fetchQueries("p", page, "sort_by", sortBy)
          .then(({ articles }) => {
            this.setState({ articles });
          })
          .catch(() => {
            navigate("/not-found");
          });
      } else {
        console.log(page);
        fetchArticlesByTopic(filterBy, "p", page, "sort_by", sortBy)
          .then(articles => {
            this.setState({ articles });
          })
          .catch(() => {
            navigate("/not-found");
          });
      }
    }
  }

  handleFilter = event => {
    const { value } = event.target;
    this.setState({ filterBy: value });
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

  setPage = direction => {
    this.setState(prevState => {
      return {
        page: prevState.page + direction
      };
    });
  };

  render() {
    const { articles, topics, isLoading, page, hasAllItems } = this.state;
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
        <Pagination
          page={page}
          hasAllItems={hasAllItems}
          setPage={this.setPage}
        />
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
    );
  }
}

Home.propTypes = {
  path: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Home;

import React, { Component } from "react";
import { navigate } from "@reach/router/lib/history";
import PropTypes from "prop-types";
import { fetchData, fetchQueries, fetchArticleByTopic } from "../api";
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
    const { filterBy, sortBy, page } = this.state;
    if (prevState.filterBy !== filterBy) {
      if (filterBy !== "all topics") {
        fetchArticleByTopic(filterBy)
          .then(({ articles }) => {
            this.setState({ articles, isLoading: false });
          })
          .catch(() => {
            navigate("/not-found");
          });
      } else {
        fetchData("articles")
          .then(({ articles }) => {
            this.setState({ articles, isLoading: false });
          })
          .catch(() => {
            navigate("/not-found");
          });
      }
    }
    if (prevState.sortBy !== sortBy) {
      fetchQueries("sort_by", sortBy).then(({ articles }) => {
        this.setState({ articles });
      });
    }
    if (prevState.page !== page) {
      fetchQueries("p", page).then(({ articles }) => {
        if (articles.length < 5) {
          this.setState({ hasAllItems: true, articles });
        } else {
          this.setState({ hasAllItems: false, articles });
        }
      });
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
    const { page } = this.state;
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

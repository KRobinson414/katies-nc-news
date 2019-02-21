import React, { Component } from "react";
import { Router } from "@reach/router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Article from "./components/Article";
import Users from "./components/Users";
import TopicAdder from "./components/TopicAdder";
import ArticleAdder from "./components/ArticleAdder";
import NotFound from "./components/NotFound";
import BadRequest from "./components/BadRequest";
import Sidebar from "./components/Sidebar";

import "./App.css";
import UserProfile from "./components/UserProfile";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  setUser = user => {
    this.setState({
      user
    });
    localStorage.setItem("user", JSON.stringify(user));
  };

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (err) {
          this.setState({ user: null });
        }
      }
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Navbar user={user} setUser={this.setUser} />
        <div className="App-container">
          <Router>
            <Home path="/" setUser={this.setUser} />
            <Article
              path="/articles/:article_id"
              user={user}
              setUser={this.setUser}
            />
            <Users path="/users" user={user} setUser={this.setUser} />
            <UserProfile path="/:username" user={user} />
            <TopicAdder path="/add-topic" user={user} />
            <ArticleAdder path="/add-article" user={user} />
            <NotFound path="/not-found" />
            <BadRequest path="/bad-request" />
          </Router>
          <div className="App-sidebar">
            <Sidebar user={user} setUser={this.setUser} />
          </div>
          <div className="App-body" />
        </div>
      </div>
    );
  }
}

export default App;

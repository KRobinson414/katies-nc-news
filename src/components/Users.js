import React, { Component } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import { fetchData } from "../api";
import "../css/Users.css";

export class Users extends Component {
  state = {
    users: [],
    isLoading: true
  };

  componentDidMount() {
    fetchData("users").then(({ users }) => {
      this.setState({ users, isLoading: false });
    });
  }

  render() {
    const { users, isLoading } = this.state;
    if (isLoading) return <h3>Loading users...</h3>;

    return (
      <div className="App-body">
        <h1 className="header">Users</h1>
        <div className="users">
          {users &&
            users.map(user => (
              <Link
                to={`/users/${user.username}`}
                key={user.username}
                username={user.username}
              >
                <div id="user-card">
                  <p>
                    <img alt="User Avatar" src={user.avatar_url} />
                  </p>
                  <p className="user-card-text">{user.username}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Users;

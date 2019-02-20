import React, { Component } from "react";
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
        <h1>Users</h1>
        <div className="users">
          {users &&
            users.map(user => (
              <div key={user.username} id="user-card">
                <p>
                  <img alt="User Avatar" src={user.avatar_url} />
                </p>
                <p>{user.username}</p>
              </div>
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

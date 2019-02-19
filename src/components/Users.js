import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchData } from "../api";
import "../css/Users.css";

export class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetchData("users").then(({ users }) => {
      this.setState({ users });
    });
  }

  render() {
    const { users } = this.state;

    return (
      <div className="App-body">
        <h1>Users</h1>
        <div className="users">
          {users ? (
            users.map(user => (
              <div key={user.username} id="user-card">
                <p>
                  <img alt="User Avatar" src={user.avatar_url} />
                </p>
                <p>{user.username}</p>
              </div>
            ))
          ) : (
            <p>Loading ussers...</p>
          )}
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

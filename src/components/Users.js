import React, { Component } from "react";
import PropTypes from "prop-types";

export class Users extends Component {
  state = {
    users: []
  };

  render() {
    return <div>USERS</div>;
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

import React, { Component } from "react";
import PropTypes from "prop-types";

export class UserProfile extends Component {
  render() {
    return <div>PROFILE</div>;
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

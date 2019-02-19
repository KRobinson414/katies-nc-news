import React, { Component } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import userAvatar from "../images/man(3).png";

export class Sidebar extends Component {
  state = {
    userText: "",
    showArticleAdder: false
  };

  handleLogout = event => {
    const { setUser } = this.props;
    event.preventDefault();
    setUser();
  };

  render() {
    const { user, setUser } = this.props;

    return (
      <div className="App-sidebar">
        {user ? (
          <div>
            <img
              className="image"
              src={user.avatar_url}
              alt="User avatar"
              width="80%"
              height="auto"
            />
            <p id="welcome">Welcome back {user.username}!</p>
            <p>
              <button id="logout" onClick={this.handleLogout}>
                Logout
              </button>
            </p>
          </div>
        ) : (
          <div>
            <img
              className="image"
              src={userAvatar}
              alt="Unknown user"
              width="80%"
              height="auto"
            />
            <p>Login to your account:</p>
            <Login setUser={setUser} />
          </div>
        )}
      </div>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Sidebar;
import React from "react";
import { Link, navigate } from "@reach/router";
import PropTypes from "prop-types";
import Login from "./Login";
import userAvatar from "../images/man(3).png";

const Sidebar = ({ user, setUser }) => {
  const handleLogout = event => {
    event.preventDefault();
    navigate("/");
    setUser();
  };

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
            <Link to={`/${user.username}`}>
              <button id="profileLink">Your profile</button>
            </Link>
          </p>
          <p>
            <Link to="/add-topic">
              <button id="postArticle">Post an article</button>
            </Link>
          </p>
          <p>
            <button id="logout" onClick={handleLogout}>
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
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Sidebar;

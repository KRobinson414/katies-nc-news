import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Login from "../components/Login";

const Menu = ({ user, setUser }) => {
  const handleLogout = event => {
    event.preventDefault();
    setUser();
  };

  return (
    <div id="menu">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/users">Users</Link>
      </div>
      {user ? (
        <>
          <div className="menu-link">Logged in as {user.username}</div>
          <div className="menu-link">
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

Menu.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Menu;

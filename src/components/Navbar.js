import React, { Component } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Menu from "./Menu";
import "../css/Navbar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

library.add(faBars);

export class Navbar extends Component {
  state = {
    showMenu: false
  };

  toggleMenu = event => {
    const { showMenu } = this.state;
    event.preventDefault();
    if (!showMenu) {
      this.setState({ showMenu: true });
    }
    if (showMenu) {
      this.setState({ showMenu: false });
    }
    console.log(showMenu);
  };

  render() {
    const { user, setUser } = this.props;
    const { showMenu } = this.state;

    return (
      <nav id="nav-bar">
        <button className="nav-burger" onClick={this.toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {showMenu && <Menu user={user} setUser={setUser} />}

        <span id="logo">NC NEWS</span>
        <span className="links">
          <Link to="/">Home</Link>
        </span>
        <span className="links">
          <Link to="/users">Users</Link>
        </span>
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  setUser: PropTypes.func.isRequired
};

export default Navbar;

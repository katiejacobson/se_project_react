import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({ handleAddClick, weatherData }) {
  function getDate() {
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    return currentDate;
  }

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  console.log(currentUser);

  const displayAvatar = () => {};

  return (
    <header className="header">
      <div className="header__date-container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {getDate()}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__user-container">
            <button
              type="button"
              onClick={handleAddClick}
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile">
              <div className="header__profile-info">
                <p className="header__username">{currentUser?.username}</p>
                {currentUser?.avatarUrl ? (
                  <img
                    className="header__avatar"
                    src={currentUser?.avatarUrl}
                    alt={currentUser?.username}
                  />
                ) : (
                  <p className="header__default-avatar">
                    {currentUser?.username[0].toUpperCase()}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__user-container">
            <div className="header__register-and-login">
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Log In</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

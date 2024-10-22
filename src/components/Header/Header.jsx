import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleLogInClick,
}) {
  function getDate() {
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    return currentDate;
  }

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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
              className="header__button"
            >
              + Add Clothes
            </button>
            <Link to="/profile">
              <div className="header__profile-info">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    className="header__avatar"
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                  />
                ) : currentUser ? (
                  <p className="header__default-avatar">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : ""}
                  </p>
                ) : null}
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__user-container">
            <div className="header__register-and-login">
              <button
                type="button"
                className="header__button"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__button"
                onClick={handleLogInClick}
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

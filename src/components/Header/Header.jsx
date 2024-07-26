import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  function getDate() {
    const currentDate = new Date().toLocaleString("default", {
      month: "long",
      day: "numeric",
    });
    return currentDate;
  }

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
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <Link to="/profile">
          <div className="header__profile-info">
            <p className="header__username">Terrence Tegegne</p>
            <img className="header__avatar" src={avatar} alt="avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;

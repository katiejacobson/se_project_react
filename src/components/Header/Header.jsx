import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import Switch from "../Switch/Switch.jsx";
import { useState } from "react";

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
        <img className="header__logo" src={logo} alt="Logo" />
        <p className="header__date-and-location">
          {getDate()}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <Switch />
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="avatar" />
      </div>
    </header>
  );
}

export default Header;

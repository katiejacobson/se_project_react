import React, { useContext, useState } from "react";
import "./Switch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

const Switch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <label className="switch">
        <input
          className="switch-box"
          type="checkbox"
          onChange={handleToggleSwitchChange}
        />
        <span
          className={
            currentTemperatureUnit === "F"
              ? "switch__slider switch__slider-F"
              : "switch__slider switch__slider-C"
          }
        >
          {currentTemperatureUnit}
        </span>
        <p
          className={`switch__temp-F ${
            currentTemperatureUnit === "F" && "switch__active"
          }`}
        >
          F
        </p>
        <p
          className={`switch__temp-C ${
            currentTemperatureUnit === "C" && "switch__active"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
};

export default Switch;

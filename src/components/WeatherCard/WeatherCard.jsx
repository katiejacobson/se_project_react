import "./WeatherCard.css";
import React, { useContext } from "react";
import sunny from "../../assets/sunny.png";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function checkData(data) {
  console.log(data);
}

function WeatherCard({ weatherData, setTemperatureDisplay }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOption[0]?.url;
  const weatherOptionCondition = filteredOption[0]?.condition;

  return (
    <section className="weathercard">
      <div className="weathercard__container">
        <p className="weathercard__text">
          {setTemperatureDisplay(currentTemperatureUnit)}
        </p>
        <img
          className="weathercard__image"
          src={weatherOptionUrl}
          alt={weatherOptionCondition}
        />
      </div>
    </section>
  );
}

export default WeatherCard;

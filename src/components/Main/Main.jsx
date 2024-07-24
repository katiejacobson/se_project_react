import "./Main.css";
import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function checkVariables(data) {
  console.log(data);
}

function Main({ weatherData, handleCardClick, setTemperatureDisplay }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        setTemperatureDisplay={setTemperatureDisplay}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {setTemperatureDisplay(currentTemperatureUnit)}{" "}
          <span
            className={
              currentTemperatureUnit === "F" ? "cards__unit-F" : "cards__unit-C"
            }
          ></span>{" "}
          / You may want to wear
        </p>
        <ul className="itemcards">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

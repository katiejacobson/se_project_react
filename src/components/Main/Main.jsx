import "./Main.css";
import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  handleCardClick,
  setTemperatureDisplay,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
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
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

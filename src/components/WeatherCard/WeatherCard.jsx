import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import { weatherOptions } from "../../utils/constants";

function checkData(data) {
  console.log(data);
}

function WeatherCard({ weatherData }) {
  // checkData(weatherData);

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
        <p className="weathercard__text">{weatherData.temperature} &deg; F</p>
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

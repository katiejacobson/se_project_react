import { renderResult } from "./api.js";

function getWeatherDescription(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => renderResult(res));
};

export const processWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temperature = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherDescription(data.main.temp);
  result.isDay = getDayorNight(data.sys.sunrise, data.sys.sunset, getTime());
  result.condition = data.weather[0].main.toLowerCase();
  return result;
};

export function getTime() {
  const currentTime = Date.now() / 1000;
  return currentTime;
}

export function getDayorNight(sunrise, sunset, currentTime) {
  if (currentTime > sunrise && currentTime < sunset) {
    return true;
  } else {
    return false;
  }
}

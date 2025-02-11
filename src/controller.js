import Data from "./data";
import Validate from "./validation";

export default class Controller {
  constructor() {
    this.currentUnits = "imperial";
    this.currentWeatherData = document.querySelector("[data-weather]");
  }

  static initButtons() {
    const searchButton = document.getElementById("submit-button");
    const celsius = document.getElementById("celsius");
    const fahrenheit = document.getElementById("fahrenheit");

    searchButton.onclick = () => {
      Controller.searchWeather();
    };

    celsius.onclick = () => {
      this.currentUnits = "metric";
      Controller.displayWeather(this.currentWeatherData);
      fahrenheit.disabled = false;
      celsius.disabled = true;
    };

    fahrenheit.onclick = () => {
      this.currentUnits = "imperial";
      Controller.displayWeather(this.currentWeatherData);
      fahrenheit.disabled = true;
      celsius.disabled = false;
    };

    fahrenheit.disabled = true;
  }

  static async searchWeather() {
    const location = Validate.getInputFromSearch();

    if (!Validate.validateInput(location)) {
      return;
    }

    try {
      const weatherData = await Data.fetchWeather(location);

      if (!weatherData) {
        return;
      }

      const weatherObj = Data.extractWeatherData(weatherData);
      Controller.displayWeather(weatherObj);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  static displayWeather(weatherObj) {
    this.currentWeatherData = weatherObj;

    const weatherCard = document.getElementById("weather-card");
    const location = document.getElementById("location");
    const date = document.getElementById("date");
    const weatherIcon = document.getElementById("weather-icon");
    const description = document.getElementById("description");
    const temperature = document.getElementById("temperature");
    const feelTemperature = document.getElementById("feels-like");
    const wind = document.getElementById("wind");
    const humidity = document.getElementById("humidity");
    const cloudiness = document.getElementById("cloudiness");

    location.textContent = weatherObj.location;
    weatherIcon.src = weatherObj.icon;
    description.textContent = weatherObj.weatherDescription;
    humidity.textContent = weatherObj.humidity;
    cloudiness.textContent = weatherObj.cloud;

    if (this.currentUnits === "metric") {
      date.textContent = weatherObj.dateMetric;
      temperature.textContent = weatherObj.temperatureC;
      feelTemperature.textContent = weatherObj.feelTemperatureC;
      wind.textContent = weatherObj.windKph;
    } else {
      date.textContent = weatherObj.dateImperial;
      temperature.textContent = weatherObj.temperatureF;
      feelTemperature.textContent = weatherObj.feelTemperatureF;
      wind.textContent = weatherObj.windMph;
    }

    weatherCard.setAttribute("data-weather", `${weatherObj}`);
  }
}

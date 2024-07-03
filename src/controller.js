import Data from "./data";
import Validate from "./validation";

export default class Controller {
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

      Controller.displayWeather(weatherData);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  static displayWeather(weatherData) {
    console.log(weatherData);
    const weatherObj = Data.extractWeatherData(weatherData);
    console.log(weatherObj);

    const location = document.getElementById("location");
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
    temperature.textContent = weatherObj.temperatureF;
    feelTemperature.textContent = weatherObj.feelTemperatureF;
    wind.textContent = weatherObj.windMph;
    humidity.textContent = weatherObj.humidity;
    cloudiness.textContent = weatherObj.cloud;
  }
}

import Controller from "./controller";
import Data from "./data";

export default class DOMManager {
  static initialize() {
    Controller.initButtons();
    DOMManager.initializeWeather();
  }

  static async initializeWeather() {
    const weatherData = await Data.fetchWeather("New York");
    const weatherObj = Data.extractWeatherData(weatherData);
    Controller.displayWeather(weatherObj);
  }
}

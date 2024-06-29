import Data from "./data";

export default class Controller {
  static async searchWeather() {
    const location = document.getElementById("weather-input").value;
    try {
      const weatherData = await Data.fetchWeather(location);
      console.log(weatherData);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

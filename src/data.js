import Validate from "./validation";

export default class Data {
  static async fetchWeather(location) {
    const errorMsg = document.getElementById("error");
    try {
      const response = await fetch(
        `${process.env.WEATHER_API_URL}/current.json?key=${process.env.API_KEY}&q=${location}`,
        { mode: "cors" },
      );

      if (!Validate.validateAPI(response, location)) {
        return null;
      }

      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  }
}

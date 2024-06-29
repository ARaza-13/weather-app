export default class Data {
  static async fetchWeather(location) {
    try {
      const response = await fetch(
        `${process.env.WEATHER_API_URL}/current.json?key=${process.env.API_KEY}&q=${location}`,
        { mode: "cors" },
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

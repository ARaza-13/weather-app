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
      console.log(weatherData);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

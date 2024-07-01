export default class Validate {
  static getInputFromSearch() {
    const searchInput = document.getElementById("weather-input");
    const location = searchInput.value;

    if (location) {
      return location
        .replace(/(\s+$|^\s+)/g, "") //remove whitespace from beginning and end of string
        .replace(/(,\s+)/g, ",") // remove any white space that follows a comma
        .replace(/(\s+,)/g, ",") // remove any white space that proceeds a comma
        .replace(/\s+/g, "+"); // replace any remaining white space with a +, to work with the api cell
    }
    return "";
  }

  static validateInput(input) {
    const errorMsg = document.getElementById("error");

    if (input === "") {
      errorMsg.textContent = "Please enter a valid location.";
      return false;
    }

    errorMsg.textContent = "";
    return true;
  }

  static validateAPI(response, location) {
    const errorMsg = document.getElementById("error");

    if (!response.ok) {
      errorMsg.textContent = `${location} is not a valid location.`;
      return false;
    }

    errorMsg.textContent = "";
    return true;
  }
}

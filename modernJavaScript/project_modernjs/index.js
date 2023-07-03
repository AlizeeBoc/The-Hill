import Data from "./config.js";

const createElmt = (childClass, parent, elmt) => {
  const child = document.createElement(elmt);
  child.classList.add(childClass);
  parent.appendChild(child);
  return child;
};

const searchBar = document.querySelector("#searchBar");
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector(".city-name");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log("hello world");
// Event will start on a keyup action
searchBar.addEventListener("keyup", (event) => {
  // checking the action for specific key (Enter)
  if (event.key === "Enter") {
    // Store target in variable
    const city = event.target.value.toLowerCase();
    const apiUrl =
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=` +
      Data.key;
    event.currentTarget.value = "";
    // Fetching first api to get the City coordinates
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const lat = data[0].lat;
        const long = data[0].lon;
        // console.log(data);
        cityNameContainer.innerHTML = data[0].name;

        // Fetching final data according to the coordinates
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=` +
            Data.key
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            console.log(
              "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
            );

            // Removing all child elements from Container before creating new set of elements
            while (container.firstChild) {
              container.removeChild(container.firstChild);
            }

            // Looping through 5 days of weather data
            for (let i = 0; i < 5; i++) {
              // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
              const date = new Date();
              let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
              const data = result.list[i];

              const card = createElmt("card", container, "div");

              const imageBox = createElmt("imgBx", card, "div");

              //   const imageBox = document.createElement("div");
              //   imageBox.classList.add("imgBx");
              //   card.appendChild(imageBox);

              const cardImg = document.createElement("img");
              cardImg.src =
                "http://openweathermap.org/img/wn/" +
                data.weather[0].icon +
                "@2x.png";
              imageBox.appendChild(cardImg);

              const contentBox = createElmt("contentBx", card, "div");

              const cardHeader = document.createElement("h2");
              cardHeader.innerHTML = dayOfTheWeek;
              contentBox.appendChild(cardHeader);

              const tempDescription = document.createElement("h4");
              tempDescription.innerHTML = data.weather[0].description;
              contentBox.appendChild(tempDescription);

              const currentTempBox = createElmt("color", contentBox, "div");

              const currentTempHeader = document.createElement("h3");
              currentTempHeader.innerHTML = "Temp:";
              currentTempBox.appendChild(currentTempHeader);

              const currentTemp = document.createElement("span");
              currentTemp.classList.add("current-temp");
              currentTemp.innerHTML = data.main.temp + "°C";
              currentTempBox.appendChild(currentTemp);


              const minMaxTemperatures = createElmt("details", contentBox, "div")

              const minMaxTempHeader = document.createElement("h3");
              minMaxTempHeader.innerHTML = "More:";
              minMaxTemperatures.appendChild(minMaxTempHeader);

              const minTemp = document.createElement("span");
              minTemp.classList.add("min-temp");
              minTemp.innerHTML = data.main.temp_min + "°C";
              minMaxTemperatures.appendChild(minTemp);

              const maxTemp = document.createElement("span");
              maxTemp.classList.add("max-temp");
              maxTemp.innerHTML = data.main.temp_max + "°C";
              minMaxTemperatures.appendChild(maxTemp);
            }
          });
      })
      .catch((error) => {
        // If there are errors, send out an error message
        console.error("Error:", "not a place!");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        return alert("Are you sure you aren't holding your map upside down?");
      });
  }
});

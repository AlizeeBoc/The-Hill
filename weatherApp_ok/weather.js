// to fix :
//faire une deuxième recherche proprement : V
//min et max : api.openweathermap.org/data/2.5/forecast/daily?lat={latitude}&lon={longitude}&cnt={5}&units=metric&appid={API key} ?!! nope, api payante. Fetch les températures de chaque entrée blabla
//randomepictures : landscapes uniquement : v
// comment obtenir une photo d'unsplash en arrière plan de ma main sans refaire un fetch?
// submit:hover dafuck?!!!

/* The Mission
You have been sent abroad for a 10-month work mission. 
Your family and friends back home ask you about the weather where you live ALL. THE. TIME.
Enough is enough, you decide to build a small web application for them so that you can free your time to talk about more interesting topics.

Specifications
🌱 Must haves

In the home page the user can enter the city of his/her choice (think of the right HTML elements here)
On clicking the SUBMIT button or pressing ENTER the application will display the weather for the next 5 days
The application must be responsive and mobile friendly */

const submitBtn = document.getElementById("submit");
const cityInput = document.getElementById("cityInput");
const body = document.body;

var mykey = config.MY_KEY;
// const APIKey = "5b384a3b776b49fa2d43063ba338e1f9";

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchWeatherData();
  }
});

const fetchWeatherData = () => {
  let input = document.getElementById("cityInput");
  let city = input.value;

  const clean = document.querySelectorAll(".clean");
  clean.forEach((element) => {
    element.remove();
  });

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=`+mykey
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        console.log(data);
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=`+mykey
        )
          // fetch(
          //   `api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&units=metric&cnt=3&appid=${APIKey}`
          // )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            let container = document.getElementById("container");
            const daysSection = document.createElement("section");
            daysSection.id = "daysSection";

            for (let i = 0; i < 5; i++) {
              const forecast = data.list[i * 8]; // car "5 day forecast is available at any location on the globe. It includes weather forecast data with 3-hour step. " 3 * 8 = 24h

              const day = {};
              day.name = getDayName(forecast.dt_txt);
              day.dateTime = new Date(forecast.dt * 1000);
              day.description = forecast.weather[0].description;
              day.temperature = Math.round(forecast.main.temp);
              // day.maxTemperature = Math.round(forecast.main.temp_max);
              // day.minTemperature = Math.round(forecast.main.temp_min);

              if (i === 0) {
                const mainSection = document.createElement("section");
                mainSection.id = "mainSection";

                const main = document.querySelector("main");
                main.style.height = "85vh";
                main.style.width = "70vw";

                const cityDescription = document.createElement("div");
                const cityName = document.createElement("h1");
                cityName.id = "cityName";
                cityName.innerText = `${city}`;
                cityName.style.textTransform = "capitalize";

                const date = document.createElement("p");
                date.innerText = day.dateTime.toLocaleString("en-US", {
                  month: "long",
                  weekday: "long",
                  year: "numeric",
                  day: "numeric",
                  hour: "numeric",
                });

                const descriptionText = document.createElement("p");
                descriptionText.innerText = day.description;
                descriptionText.id = "descriptionText";
                cityDescription.append(cityName);
                cityDescription.append(date);

                const dayTemp = document.createElement("p");
                dayTemp.innerText = day.temperature + "°C";
                dayTemp.id = "dayTemp";
                cityDescription.append(dayTemp);

                cityDescription.append(descriptionText);
                cityDescription.setAttribute("class", "clean");
                cityDescription.id = "cityDescription";

                const icone = document.createElement("img");
                icone.src =
                  "https://openweathermap.org/img/wn/" +
                  data.list[0].weather[0].icon +
                  "@2x.png";
                icone.id = "icon";

                cityDescription.append(icone);

                // const tempSide = document.createElement("div");

                // const minMax = document.createElement("div");
                // minMax.id = "minMax";
                // const max = document.createElement("p");
                // max.innerText = day.maxTemperature;
                // const min = document.createElement("p");
                // min.innerText = day.minTemperature;

                // minMax.appendChild(max);
                // minMax.appendChild(min);

                // tempSide.appendChild(minMax);
                // cityDescription.append(minMax);

                // cityDescription.insertBefore(
                //   dayTemp,
                //   cityDescription.children[1]
                // );

                mainSection.appendChild(cityDescription);
                // mainSection.appendChild(tempSide);

                // container.append(mainSection);
                const mainContainer = document.querySelector("main");
                mainContainer.append(mainSection);

                input = document.querySelector("input");
                input.value = "";
              } else {
                let divDay = document.createElement("div");
                divDay.setAttribute("class", "divDay");

                let dayName = document.createElement("p");
                dayName.innerText = day.name;

                let dayIcon = document.createElement("img");
                dayIcon.src =
                  "https://openweathermap.org/img/wn/" +
                  data.list[i].weather[0].icon +
                  ".png";

                let dayTemp = document.createElement("p");
                dayTemp.innerText = day.temperature;

                divDay.append(dayName);
                divDay.append(dayIcon);
                divDay.append(dayTemp);

                daysSection.append(divDay);
                daysSection.setAttribute("class", "clean");

                container.appendChild(daysSection);
              }

              const mainContainer = document.querySelector("main");
              mainContainer.append(container);
              // mainContainer.classList.toggle("styleMain");

              const header = document.getElementById("header");
              const mainSection = document.getElementById("mainSection");
              mainSection.insertBefore(header, mainSection.firstChild);
            }
          })
          .catch((error) => {
            console.error(
              "Une erreur s'est produite lors de la récupération des données météorologiques :",
              error
            );
          });
      } else {
        console.error(
          "Aucune coordonnée géographique trouvée pour la ville spécifiée."
        );
      }
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des coordonnées géographiques :",
        error
      );
    });
};

let getDayName = (dateString) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString); // Convertir le timestamp en millisecondes
  return daysOfWeek[date.getDay()];
};

submitBtn.addEventListener("click", fetchWeatherData);

let unsplashKey = config.MY_UNSPLASH_KEY
let unsplashUrl = "https://api.unsplash.com/photos/random/?client_id="+unsplashKey+"&query=landscape";
let test = document.createElement("img");
body.append(test);

fetch(unsplashUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des images :",
      error
    );
  });

////////////////////////////////////////////////////////////////////////// SOURCES ///////////////////////////////////////////////////////////////////////////////////////////////////////////

///// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
////  https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey} --> non
//            api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} ---> ok mais nécessite une autre api pour fetch les min et max
//// json viewer extension
///tuto css : https://www.youtube.com/watch?v=WZNG8UomjSI
// tuto random picture unsplash : https://www.youtube.com/watch?v=e8p1zSNmK7Q
// idéées de petite app à réaliser https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App

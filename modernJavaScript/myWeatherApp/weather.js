// to fix :
// argh ... je crée des objets jours dont les données s'écrasent les une apres les autres non?
// les minimums et max en fin de journée sont presqu'égaux car trop peu de datas pour établir une prévision fiable
// dafuck? .catch((error) manquants

/* The Mission
You have been sent abroad for a 10-month work mission. 
Your family and friends back home ask you about the weather where you live ALL. THE. TIME.
Enough is enough, you decide to build a small web application for them so that you can free your time to talk about more interesting topics.

Specifications
🌱 Must haves

In the home page the user can enter the city of his/her choice (think of the right HTML elements here)
On clicking the SUBMIT button or pressing ENTER the application will display the weather for the next 5 days
The application must be responsive and mobile friendly */

import {
  CalculMinTemperatures,
  minTemperature,
  convertTimeStamp,
  maxTemperature,
  calculMaxTemperatures,
} from "./calculator.js";
import { removeCityCardDef } from "./removeCityCardDef.js";
import { getDayOfWeek } from "./getDayOfWeek.js";
import { setId_InnerTxt } from "./setId_InnerText.js";

/////////////////////////////////////////////////// CODE ////////////////////////////////////////

const body = document.querySelector("body");
var myKey = config.Key_openWeather;

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=Brussels&limit=1&appid=` +
    myKey
)
  .then((response) => response.json())
  .then((data) => {
    const lat = data[0].lat;
    const long = data[0].lon;
    // console.log(data);


    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=` +
        myKey
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const day = {};

        day.name = "Brussels";
        day.dateTime = new Date(data.list[0].dt * 1000);
        day.description = data.list[0].weather[0].description;
        day.temperature = Math.round(data.list[0].main.temp);
        // temperatures a modifier

        const cityNameDef = setId_InnerTxt("cityNameDef", day.name);
        const dateDef = setId_InnerTxt(
          "dateDef",
          day.dateTime.toLocaleString("en-US", {
            month: "long",
            weekday: "long",
            year: "numeric",
            day: "numeric",
          })
        );

        const tempDef = setId_InnerTxt("tempDef", day.temperature + "°c");
        const descriptionDef = setId_InnerTxt(
          "descriptionDef",
          day.description
        );

        const iconDef = document.getElementById("iconDef");
        iconDef.src =
          "https://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          "@2x.png";
      });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des coordonnées géographiques pour Bruxelles:",
      error
    );
  });

/// EventListeners, clean la page (pour pouvoir afficher les données de la ville entrée, sans conflit)+ extraction des données météo  ///

const inputDef = document.getElementById("inputDef");
const input = document.getElementById("searchField");
const cityCard = document.getElementById("cityCard");

inputDef.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("forecasts").replaceChildren();
    document.body.style.height = "fit-content";

    fetchWeatherData();
    cityCard.style.display = "block";
    cityCard.classList.add("oldCard");
  }
});

/////////////Ville entrée dans la barre de recherche/////////////////////////
const fetchWeatherData = () => {
  setTimeout(removeCityCardDef, 50);
  body.classList = "styleBody";

  const key_unsplash = config.key_Unsplash;

  let input = document.querySelector(".input");
  let city = input.value;

  fetch(
    "https://api.unsplash.com/photos/random/?client_id=" +
      key_unsplash +
      `&query=${city}`
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      body.style.backgroundImage = `url(${data.urls.regular})`;
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des images pour la ville recherchée:",
        error
      );
    });

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=` +
      myKey
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // console.log(data);

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=` +
            myKey
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log(data.list);

            const days = [];

            for (let i = 0; i < data.list.length - 1; i++) {
              let currentDay = convertTimeStamp(data.list[i].dt).slice(0, 2);
              let nextDay = convertTimeStamp(data.list[i + 1]?.dt).slice(0, 2);

              if (currentDay !== nextDay) {
                let dayOfWeek = getDayOfWeek(data.list[i].dt);
                let description = data.list[i].weather[0].description;

                days.push({
                  nameDay: dayOfWeek,
                  description: description,
                  icon:
                    "https://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon +
                    "@2x.png",
                });
              }
            }

            console.log(days);
            // console.log(calculcalculMeanTempPerDay(data.list));
            console.log(minTemperature(data.list));
            console.log(maxTemperature(data.list));

            days.forEach((day, index) => {
              day.min = Math.round(minTemperature(data.list)[index]);
              day.max = Math.round(maxTemperature(data.list)[index]);
            });

            setId_InnerTxt("cityName", input.value);

            input.value = "";

            const newDate = new Date(data.list[0].dt * 1000).toLocaleString(
              "en-US",
              {
                month: "long",
                weekday: "long",
                year: "numeric",
                day: "numeric",
              }
            );

            setId_InnerTxt("date", newDate);

            const dataList = data.list;

            setId_InnerTxt("temp", Math.round(dataList[0].main.temp) + "°c");

            setId_InnerTxt("description", dataList[0].weather[0].description);

            let icon = document.getElementById("icon");
            icon.src =
              "https://openweathermap.org/img/wn/" +
              data.list[0].weather[0].icon +
              "@2x.png";

            const minMax =
              Math.round(minTemperature(dataList)[0]) +
              "/" +
              Math.round(maxTemperature(dataList)[0]) +
              "°c";

            setId_InnerTxt("minMax", minMax);

            setId_InnerTxt("wind", dataList[0].wind.speed + " m/s");
            setId_InnerTxt("humidity", dataList[0].main.humidity + " %");

            const visibility = document.getElementById("visibility");
            visibility.innerText = data.list[0].visibility / 1000 + " km";

            const createForecasts = (forecast) => {
              const forecasts = document.getElementById("forecasts");
              const dailyForecast = document.createElement("div");
              dailyForecast.setAttribute("class", "dailyForecast");

              const dayNameForecast = document.createElement("p");
              dayNameForecast.id = "dayNameForecast";
              dayNameForecast.innerText = forecast.nameDay;

              const iconForecast = document.createElement("img");
              iconForecast.id = "iconForecast";
              iconForecast.src = forecast.icon;

              const tempForecast = document.createElement("div");
              tempForecast.id = "tempForecast";

              const minMaxForecast = document.createElement("p");
              minMaxForecast.id = "minMaxForecast";
              minMaxForecast.innerText =
                forecast.min + "/" + forecast.max + "°c";

              tempForecast.appendChild(minMaxForecast);

              dailyForecast.append(dayNameForecast);
              dailyForecast.append(iconForecast);
              dailyForecast.append(tempForecast);

              forecasts.append(dailyForecast);
            };

            days.slice(1).forEach((forecast) => {
              createForecasts(forecast);
            });
          });
      }
    });
};

const submitBtn = document.querySelector("#submitDef");
submitBtn.addEventListener("click", () => {
  fetchWeatherData();
  // input.style.display = "block";
  cityCard.style.display = "block";
});

let unsplashKey = config.key_Unsplash;
let unsplashUrl =
  "https://api.unsplash.com/photos/random/?client_id=" +
  unsplashKey +
  "&query=Bruxelles";

let background = document.createElement("img");
body.append(background);

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

///////////////////////////////////////////////////////////////////////////// APPRENTISSAGES ///////////////////////////////////////

// 1. Créer des fonctions pour alléger le code principal
// 2. SelectByClassName ----------------> collection HTML : impossible d'itérer dessus avec un forEach.
//    QuerySelectorAll  ----------------> NodeList donc ok pour le forEach
//    EXEMPLE :
//      inputs.forEach((input) => {
//        input.addEventListener("keypress", (event) => {
//          if (event.key === "Enter") {
//            fetchWeatherData();
//          }
//        });
//      });
// 3. json viewer extension

// ////////////////////////////////////////////////////////////////////////// SOURCES ///////////////////////////////////////////////////////////////////////////////////////////////////////////

//  http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//  https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey} --> non
//  api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} ---> ok mais nécessite une autre api pour fetch les min et max
//  json viewer extension
//  tuto css : https://www.youtube.com/watch?v=WZNG8UomjSI
//  tuto random picture unsplash : https://www.youtube.com/watch?v=e8p1zSNmK7Q
//  idées de petites apps à réaliser https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App
//  how to hide apiKey : https://medium.com/@oreillyalan88/how-to-hide-api-keys-from-github-7a14d1bf80c

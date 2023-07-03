// to fix :
// comment afficher les datas pertinentes? En itérant sur la liste, les données par jour s'écrasent jusqu'a la derniere. L'affichage de la description et de l'icone ne correspond qu'a la derniere donnée du jour j'imagine?
// les minimums et max en fin de journée sont presqu'égaux car trop peu de datas pour établir une prévision fiable
// j'ai oublié mes .catch((error) =>'

/* The Mission
You have been sent abroad for a 10-month work mission. 
Your family and friends back home ask you about the weather where you live ALL. THE. TIME.
Enough is enough, you decide to build a small web application for them so that you can free your time to talk about more interesting topics.

Specifications
🌱 Must haves

In the home page the user can enter the city of his/her choice (think of the right HTML elements here)
On clicking the SUBMIT button or pressing ENTER the application will display the weather for the next 5 days
The application must be responsive and mobile friendly */

//////////////////////////////////////////////// FONCTIONS UTILES ///////////////////////////////

const getDayOfWeek = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
};

const setId_InnerTxt = (IdName, name) => {
  const elmt = document.getElementById(IdName);
  elmt.innerText = name;
};

const getIconUrl = (iconCode) => {
  return "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
};

const convertTimeStamp = (timeStamp) => {
  let date = new Date(timeStamp * 1000);
  return date.toLocaleDateString("en-US", {
    month: "long",
    weekday: "long",
    year: "numeric",
    day: "numeric",
  });
};

// console.log(convertTimeStamp(1688223600));

const calculMean = (array) => {
  let sum = 0;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  result = sum / array.length;
  return result;
};

const calculMeanTempPerDay = (dataList) => {
  let temptab = [];
  let DaysMeanTemp = [];
  for (let j = 0; j < dataList.length - 1; j++) {
    let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
    if (day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2)) {
      temptab.push(dataList[j].main.temp);
      DaysMeanTemp.push(calculMean(temptab));
      temptab = [];
    } else {
      temptab.push(dataList[j].main.temp);
    }
  }
  return DaysMeanTemp;
};

const CalculMinTemperatures = (array) => {
  let min = array[0];
  for (i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
  }
  return min;
};
// min temperatue over 5 days

// problème : pour j === dataList.length n'est pas pris en compte. A la dernière itération, des données sont exclues de dailyTemp et donc min temp
const minTemperature = (dataList) => {
  let dailyTemp = [];
  let minTemp = [];

  for (let j = 0; j < dataList.length - 1; j++) {
    let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
    if (day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2)) {
      dailyTemp.push(dataList[j].main.temp);
      minTemp.push(CalculMinTemperatures(dailyTemp));
      dailyTemp = [];
    } else {
      dailyTemp.push(dataList[j].main.temp);
    }
  }
  return minTemp;
};

// const minTemperature = (dataList) => {
//   let dailyTemp = [];
//   let minTemp = [];

//   for (let j = 0; j < dataList.length; j++) {
//     let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
//     if (
//       day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2) ||
//       j === dataList.length - 1
//     ) {
//       dailyTemp.push(dataList[j].main.temp);
//       minTemp.push(CalculMinTemperatures(dailyTemp));
//       dailyTemp = [];
//     } else {
//       dailyTemp.push(dataList[j].main.temp);
//     }
//   }
//   return minTemp;
// };

const calculMaxTemperatures = (array) => {
  let max = array[0]; /// il faudrait en faire une focn
  for (i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
};
// min temperatue over 5 days

const maxTemperature = (dataList) => {
  let dailyTemp = [];
  let maxTemp = [];

  for (let j = 0; j < dataList.length - 1; j++) {
    let day = convertTimeStamp(dataList[j].dt).slice(0, 2);
    if (day != convertTimeStamp(dataList[j + 1].dt).slice(0, 2)) {
      dailyTemp.push(dataList[j].main.temp);
      maxTemp.push(calculMaxTemperatures(dailyTemp));
      dailyTemp = [];
    } else {
      dailyTemp.push(dataList[j].main.temp);
    }
  }
  return maxTemp;
};

//=> la fonction renvoie un table de 5 éléments avec les moyennes des données fournies

const removeCityCardDef = () => {
  cityCardDef = document.getElementById("cityCardDef");
  cityCardDef.remove();
};

const body = document.querySelector("body");
/////////////////////////////////////////////////// CODE ////////////////////////////////////////

////////////////////////                  Ville par defaut                /////////////////////////

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
    if (cityCard.classList.contains("oldCard")){
      cityCard.remove()
    }
    fetchWeatherData();
    cityCard.style.display = "block";
    cityCard.classList.add("oldCard")
  }
});

/////////////Ville entrée dans la barre de recherche/////////////////////////
const fetchWeatherData = () => {
  // removeCityCardDef()
  setTimeout(removeCityCardDef, 50);
  body.classList.toggle("styleBody");

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

            //---------> bugs avant minuit : plus que 4 jours. Nécessité de tout push si les dates sont différentes OU si on est arrivé à la fin des datas.

            // for (let i = 0; i < data.list.length; i++) {
            //   // -------------------------------> bug apres minuit : 6 jours en console.log (7p, 4*8p, 1p) (6p, 3*8, 2) (5p, 4*8, 3)
            //   let currentDay = convertTimeStamp(data.list[i].dt).slice(0, 2);
            //   let nextDay = convertTimeStamp(data.list[i + 1]?.dt).slice(0, 2);
            //   if (currentDay !== nextDay || i === data.list.length - 1)

            //
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

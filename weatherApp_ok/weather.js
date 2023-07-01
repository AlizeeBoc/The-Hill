// to fix :
//faire une deuxième recherche proprement :
//min et max : api.openweathermap.org/data/2.5/forecast/daily?lat={latitude}&lon={longitude}&cnt={5}&units=metric&appid={API key} ?!! nope, api payante. Fetch les températures de chaque entrée blabla
//randomepictures : landscapes uniquement : v (add "&query=KEYWORD")
// afficher la photo de la ville après avoir entré sa selection : ok, il fallait juste l'intégrer à la fonction
// je me suis plantée : j'ai utilisé un index i qui balaie ma liste et ne selectionne que les 5 premieres données comme s'il s'agissait des 5 premiers jours. Recommencer en veillant a ce que le 1 === 0 soit en fait i compris ent

/* The Mission
You have been sent abroad for a 10-month work mission. 
Your family and friends back home ask you about the weather where you live ALL. THE. TIME.
Enough is enough, you decide to build a small web application for them so that you can free your time to talk about more interesting topics.

Specifications
🌱 Must haves

In the home page the user can enter the city of his/her choice (think of the right HTML elements here)
On clicking the SUBMIT button or pressing ENTER the application will display the weather for the next 5 days
The application must be responsive and mobile friendly */
var mykey = config.MY_KEY;

/// page d'accueil --> fetch les données météo pour Bxl + photo" ///
fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=Brussels&limit=1&appid=` +
    mykey
)
  .then((response) => response.json())
  .then((data) => {
    const lat = data[0].lat;
    const long = data[0].lon;
    // console.log(data);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=` +
        mykey
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const day = {};
        day.name = "Brussels";
        day.dateTime = new Date(data.list[0].dt * 1000);
        day.description = data.list[0].weather[0].description;
        day.temperature = Math.round(data.list[0].main.temp);

        const defaultCity = document.getElementById("defaultCity");
        const defaultName = document.createElement("p");
        defaultName.innerText = day.name;
        defaultName.id = "dName";

        const defaultDate = document.createElement("p");
        defaultDate.innerText = day.dateTime.toLocaleString("en-US", {
          month: "long",
          weekday: "long",
          year: "numeric",
          day: "numeric",
        });
        defaultDate.id = "dDate";

        const defaultTemp = document.createElement("p");
        defaultTemp.innerText = day.temperature + "°c";
        defaultTemp.id = "dTemp";

        const defaultBox = document.createElement("div");
        defaultBox.id = "defaultFlex";

        const defaultDescription = document.createElement("p");
        defaultDescription.innerText = day.description;
        defaultDescription.id = "dDescription";

        const icone = document.createElement("img");
        icone.src =
          "https://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          "@2x.png";
        icone.id = "defautltIcon";

        defaultBox.append(icone);
        defaultBox.append(defaultDescription);

        defaultCity.appendChild(defaultName);
        defaultCity.appendChild(defaultDate);
        defaultCity.appendChild(defaultTemp);
        defaultCity.appendChild(defaultBox);
      });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des coordonnées géographiques pour Bruxelles:",
      error
    );
  });

/// EventListeners, clean la page (pour pouvoir afficher les données de la ville entrée, sans conflit)+ extraction des données météo  ///

const submitBtn = document.getElementById("submit");
const cityInput = document.getElementById("cityInput");
const body = document.body;
const fetchWeatherData = () => {
  const removeDiv = () => {
    const defaultCity = document.getElementById("defaultCity");
    defaultCity.remove();
  };
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
  });

  setTimeout(removeDiv, 500);
  // console.log("hello");
  let input = document.getElementById("cityInput");
  let city = input.value;

  // const deleteCard = document.querySelectorAll(".clean");
  // deleteCard.forEach((element) => {
  //   element.remove();
  // });

  /// Remove la ville par défaut  ///

  // Extraction des données météo par lat/lon puis par ville //

  let unsplashKey = config.MY_UNSPLASH_KEY;
  let unsplashUrl =
    "https://api.unsplash.com/photos/random/?client_id=" +
    unsplashKey +
    `&query=${city}`;

  fetch(unsplashUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      document.body.style.backgroundImage = `url(${data.urls.regular})`;
      body.classList.toggle("styleBody");

      const main = document.querySelector("main");
      main.classList.toggle("styleMain");

      const divDays = document.querySelectorAll(".divDay");
      divDays.forEach((element) => {
        element.classList.toggle("styleDivDay");
      });

      const daysSection = document.querySelector("#daysSection");
      daysSection.classList.toggle("styleDaysSection");
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors de la récupération des images :",
        error
      );
    });

  /// Avec ces datas on crée un objet pour ensuite générer nos "jours" ///

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=` +
      mykey
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // console.log(data);
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=` +
            mykey
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            let container = document.getElementById("container");
            const daysSection = document.createElement("section");
            daysSection.id = "daysSection";

            ////////////////////////////////////////////////////// i<8 que faire avec mon if else? //////////////////////
            for (let i = 0; i < 5; i++) {
              const forecast = data.list[i * 8]; // car "5 day forecast is available at any location on the globe. It includes weather forecast data with 3-hour step. " 3 * 8 = 24h

              const day = {};
              day.name = getDayName(forecast.dt_txt);
              day.dateTime = new Date(forecast.dt * 1000);
              day.description = forecast.weather[0].description;
              day.temperature = Math.round(forecast.main.temp);
              // day.maxTemperature = Math.round(forecast.main.temp_max);
              // day.minTemperature = Math.round(forecast.main.temp_min);

              /// Prévisions du jour ///

              // data.list.forEach(element => {
              //   for (let i of element) {
              //     if ()
              //   }

              // });

              if (i === 0) {
                const mainSection = document.createElement("section");
                mainSection.id = "mainSection";

                const main = document.querySelector("main");
                // main.style.height = "90vh";
                // main.style.width = "70vw";

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
                });

                const descriptionText = document.createElement("p");
                descriptionText.innerText = day.description;
                descriptionText.id = "descriptionText";
                cityDescription.append(cityName);
                cityDescription.append(date);

                const dayTemp = document.createElement("p");
                dayTemp.innerText = day.temperature + "°c";
                dayTemp.style.textTransform = "lowercase";
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
                input.value = "bla";

                input.style.visibility = "hidden";

                const displaySearchBar = () => {
                  input.style.visibility = "visible";
                };
                submitBtn.addEventListener("click", displaySearchBar);

                ///////////////////////////////////// Comment faire une nouvelle recherche ///////////////////////////////

                /// Prévisions des 4 jours suivants ///
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
                dayTemp.innerText = day.temperature + "°c";
                dayTemp.style.textTransform = "lowercase";

                divDay.append(dayName);
                divDay.append(dayIcon);
                divDay.append(dayTemp);

                daysSection.append(divDay);
                daysSection.setAttribute("class", "clean");

                container.appendChild(daysSection);
              }

              /// foutoir complet ///
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

/// Photo en background de ma page d'accueil ///
let unsplashKey = config.MY_UNSPLASH_KEY;
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

////////////////////////////////////////////////////////////////////////// SOURCES ///////////////////////////////////////////////////////////////////////////////////////////////////////////

///// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
////  https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey} --> non
//            api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} ---> ok mais nécessite une autre api pour fetch les min et max
//// json viewer extension
///tuto css : https://www.youtube.com/watch?v=WZNG8UomjSI
// tuto random picture unsplash : https://www.youtube.com/watch?v=e8p1zSNmK7Q
// idéées de petite app à réaliser https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App
// how to hide apiKey : https://medium.com/@oreillyalan88/how-to-hide-api-keys-from-github-7a14d1bf80c

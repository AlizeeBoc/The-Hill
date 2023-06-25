/* Exercise 2
Make a new page with a text input and a button. 
When the button is clicked, a fetch query is sent to the agify API with the name entered in the input. 
When the request is finished display the result in a new div on the page. 
Keep the the past requests on the page by creating a new div each time you make an API call. */

// ----> POST REQUEST

/* let body = document.body;
const submit = document.getElementById("submit");
submit.addEventListener("click", fetchDatas);

function fetchDatas() {
  const input = document.getElementById("name");
  const name = input.value;

  fetch(`https://api.agify.io?name=${name}`)        // Toc toc, t'as des infos la dessus?
    .then((response) => response.json())            // cool! then laisse moi voir
    .then((data) => {
                                                    // cool! Then on va créer une div avec ces datas
      const age = data.age;

      const myDiv = document.createElement("div");
      myDiv.textContent = `Name: ${name}, Age: ${age}`;
      body.insertBefore(myDiv, body.children[1]);
    })
    .catch((error) => console.log(error));            //Et si ca ne marche pas ...
} */

const body = document.body;
const submit = document.getElementById("submit");
// const resultDiv = document.getElementById("result");

submit.addEventListener("click", fetchDatas);

function generateCountryOptions(jsonData) {
  const selectCountry = document.getElementById("country");

  for (const code in jsonData) {
    const countryName = jsonData[code];
    const option = document.createElement("option");
    option.value = code;
    option.textContent = countryName;
    selectCountry.appendChild(option);
  }
}

function fetchDatas() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value;

  const selectCountry = document.getElementById("country");
  const countryCode = selectCountry.value;
  const countryName = selectCountry.options[selectCountry.selectedIndex].text;

  const myDiv = document.createElement("div");
  myDiv.id = "messageDiplayed";
  body.insertBefore(myDiv, body.children[2]);

  fetch(`https://api.agify.io?name=${name}&country_id=${countryCode}`) //!!countryCode, pas countryName!!!
    .then((response) => response.json())
    .then((data) => {
      const age = data.age;
      myDiv.textContent = `The name ${name} is approximately ${age} years old in ${countryName}.\n`;
    })
    .catch((error) => {
      console.log(error);
      myDiv.textContent = "An error occurred while fetching data.";
    });
}

// Charger le fichier JSON contenant les informations sur les pays
fetch("countries.json")
  .then((response) => response.json())
  .then((data) => {
    // Appeler la fonction pour générer les options du menu déroulant
    generateCountryOptions(data);
  })
  .catch((error) => console.log(error));

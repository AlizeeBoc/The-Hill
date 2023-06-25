// Exercise 1
// For this exercise we're going to use VSCode's live-server extension, which allows us to have a running backend in a few seconds.

// Create a new directory (= folder), containing 3 files:

// index.html
// script.js
// becode.json
// Create a <button>, when clicked becode rules are loaded with a fetch('becode.json'), then dynamically generate a <ul> list containing each rule in a <li>.

/////////////////////////////////////////////////////////////////////

// 1. On a besoin de récupérer les données : requete http GET  (1) - 'toc toc, est-ce que tu m'entends?')
//      -------> fetch()
//      Nous renvoie une promesse (la réponse http (objet))        (-'oui')

// 2. On extrait ses données                                   
//      -------> .then((response) => {
//                   return response.json()                    (2) - J'ai besoin des datas, peux tu me les envoyer?)
//               })
//      Nous renvoie promesse : données json                      (- oui, les voici)

// 3. On utilise les données pour les intégrer au DOM :        (3) - Bien reçu. apd ces datas, {crée mon Ul. Pour chaque data, {crée un "li", ajoute-lui du texte et ajoute-le à l'ul}. Ajoute l'ul au body})    
//      --------> .then((data) => {
//      let myList = document.createElement("ul");
//                     ...

// 4. On prevoit un message d'erreur                           (4) - On fait quoi en cas de pépin? ... )

// En gros ------> toc, toc/j'ai besoins des datas/pour en faire tel truc/et si ca ne marche pas ....
//     fetch(url, options)
//      .then(response => response.json())
//      .then(result => /* process result */)


let rulesButton = document.getElementById("rulesButton");
let body = document.body;

rulesButton.addEventListener("click", function () {
  fetch("becode.json")                                //toc toc       
    .then((response) => {                                   
      return response.json();                         //j'ai besoin des datas
    })
    .then((data) => {
      let myList = document.createElement("ul");      //Pour créer une ul

      data.forEach((rule) => {
        let item = document.createElement("li");
        item.textContent = rule;
        myList.appendChild(item);
      });
      //document.body.appendChild(myList);  ---> la liste se déploie après le script
      body.insertBefore(myList, body.children[1]);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

// --> 3requests. Propriétés de réponses : ws, asynch_fetch/, script.js (status 200)


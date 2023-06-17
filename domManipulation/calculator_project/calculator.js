///////////:problemes a regler
// comment clear l'écran apres une opération de facon auto? innerText = "" puis innerText = input
//comment afficher dans le operationScreen l'input avant le =
// % comment pourcentage pas modulo?

let body = document.body;
body.style.margin = "0";
body.style.padding = "0";
body.style.boxSizing = "border-box";
let container = document.querySelector("main");
let myCalculator = document.createElement("div");
let top_Screen = document.createElement("div");
let operationScreen = document.createElement("div");
let outputScreen = document.createElement("div");
let bottom = document.createElement("div");

outputScreen.innerText = "";
top_Screen.appendChild(operationScreen);
top_Screen.appendChild(outputScreen);
/* bottom.appendChild(key) */
top_Screen.style.border = "1px solid black";
top_Screen.style.borderRadius = "3px";
top_Screen.style.padding = "15px";
top_Screen.style.textAlign = "right";
myCalculator.appendChild(top_Screen);
myCalculator.appendChild(bottom);
myCalculator.style.width = "350px";
myCalculator.style.margin = "auto";
myCalculator.style.marginTop = "200px";
container.appendChild(myCalculator);

//création des boutons

const myKeys = [
  "C",
  "%",
  "/",
  7,
  8,
  9,
  "*",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  0,
  ".",
  "=",
];
var i = 0;

while (i < 18) {
  var button = document.createElement("button");
  button.textContent = myKeys[i];
  bottom.style.display = "grid";
  bottom.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"; // src qui déchire = "https://css-tricks.com/snippets/css/complete-guide-grid/"
  bottom.style.gridTemplateRows = "1fr 1fr 1fr 1fr 1fr";
  bottom.style.rowGap = "1px";
  bottom.style.columnGap = "1px";
  button.style.padding = "15px";
  button.style.borderRadius = "3px";
  bottom.appendChild(button);
  i++;
}

// classList.add ... chiffres
const arrayOfNumbers = [3, 4, 5, 7, 8, 9, 11, 12, 13, 15]; //créer une array avec les index des boutons cibles

for (let i = 0; i < arrayOfNumbers.length; i++) {
  const numButton = document.getElementsByTagName("button")[arrayOfNumbers[i]]; //on séléctionne dans myKeys les boutons qui correspondent a ces index
  numButton.classList.add("numKey"); // classList.add()
}

// classList.add ... opérateurs
const arrayOfOperators = [2, 6, 10, 14];
for (let i = 0; i < arrayOfOperators.length; i++) {
  //////////// pas necessaire avec la fct de Diogo////////////////
  let index = arrayOfOperators[i];
  let operatorButton = document.getElementsByTagName("button")[index];
  operatorButton.classList.add("opertorKey");
}

// classList.add ... aux symboles "C" et "="
const clearButton = document.getElementsByTagName("button")[0];
clearButton.classList.add("clearKey");
clearButton.style.gridColumn = "span 2";

const equalbutton = document.getElementsByTagName("button")[17];
equalbutton.classList.add("equalKey");
equalbutton.style.gridColumn = "span 2";

// addEventListener sur tous boutons (si c -> clear, si = -> calcule, si chiffre -> affiche chiffre)

function computeResult(input) {
  return Function("return " + input)(); ///!!! "return" !== "return " : owiOwi!!!!
}

let myButtons = bottom.querySelectorAll("button");

let resultDisplayed = false; //drapeau baissé

myButtons.forEach((button) => {
  //EventListener sur les boutons. condition pour "C" et "="
  button.style.backgroundColor = "black";
  button.style.color = "white";

  button.addEventListener("click", (e) => {
    if (e.target.innerText === "C") {
      outputScreen.innerText = "";
      operationScreen.innerText = "";
    } else if (e.target.innerText == "=") {
      operationScreen.append(outputScreen.innerText);
      outputScreen.innerText = computeResult(displayed);
      resultDisplayed = true; //drapeau levé
    } else {
      if (resultDisplayed === false) {
        // dans tous les autres cas tant qu'on n'a pas clické sur = avant :
        displayed = outputScreen.innerText += e.target.innerText;
        console.log(displayed);
      } else {
        // si on a cliqué sur "=" avant
        displayed = outputScreen.innerText = e.target.innerText;
        operationScreen.innerText = "";
        console.log(displayed);
        /*         if ((e.target.classList = operatorButton)) {
          displayed = outputScreen.innerText = computeResult(displayed) += operatorButton.innerText;
        } else {
          displayed = outputScreen.innerText = e.target.innerText;
          operationScreen.innerText = "";} */
        resultDisplayed = false;
      }
    }
  });
});

/* 
let restart = (outputScreen) => {
  outputScreen.innerText = "";
};                                                                              ///////////////YOU ARE LOST SOMEWHERE HERE///////////////////////

if ((outputScreen.innerText = computeResult(input))) {
  restart;
}
 */

// ------------------------------------

///////////////// DONNE PAR DIOGO /////////////////

/* function computeResult(str){
    return Function('return ' + str)()
  }
  
  const a = '(13 + 17) / 3'
  
  console.log(computeResult(a)) // Should display 10 */

///////////////// TODO : (FACULTATIF) /////////////////

/* 
Make it pretty : naaaaah!
Create an history of the previous operations  : div supplémentaire a droite (a déterminer)
Scientific calculator (trigonometry, logarithms, ...). The Math library is pretty convenient for this (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) : div supplémentaire gauche ssi affichage sur gr écran
Unit conversion (could be money or imperial units to metric system for example) : ajouter un boutton "curseur" --> eventlistener fct est une opération de conversion qui opere sur tout le code?
Pressing enter to display the result (same as pressing the = button) : eventListener keydown Enter, fonction = calculate?
Pressing number keys on the keyboard should have the same effect as pressing the calculator buttons : idem
Is it responsive? It'd better be! naaaaaaaaah!
*/

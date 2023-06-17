///////////:problemes a regler
// % comment pourcentage pas modulo?
// comment clear l'écran apres une opération de facon auto? innerText = "" puis innerText = input
//comment afficher dans le operationScreen l'input avant le =

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
let previousOperations = document.createElement("div");

outputScreen.innerText = "";
outputScreen.style.fontSize = "35px";
operationScreen.innerText = "";
operationScreen.style.fontSize = "25px";
top_Screen.appendChild(operationScreen);
top_Screen.appendChild(outputScreen);
/* bottom.appendChild(key) */
top_Screen.style.border = "2px solid #d3d3d3";
top_Screen.style.borderRadius = "10px";
top_Screen.style.padding = "15px";
top_Screen.style.margin = "10px 0px";
top_Screen.style.textAlign = "right";
top_Screen.style.height = "65px";
previousOperations.textContent = "blabla";
myCalculator.appendChild(top_Screen);
myCalculator.appendChild(bottom);
myCalculator.style.width = "630px";
myCalculator.style.height = "fit-content";
myCalculator.style.margin = "auto";
myCalculator.style.margin = "0px";
myCalculator.style.border = "2px solid #d3d3d3";
myCalculator.style.padding = "20px";
myCalculator.style.borderRadius = "10px";
container.appendChild(myCalculator);
previousOperations.style.border = "2px solid #d3d3d3";
previousOperations.style.padding = "40px 10px";
previousOperations.style.borderRadius = "10px";
previousOperations.style.marginLeft = "10px";
previousOperations.style.height = "auto";
container.appendChild(previousOperations);
container.style.display = "flex";
container.style.justifyContent = "center";
container.style.marginTop = "120px";
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
  bottom.style.rowGap = "10px";
  bottom.style.columnGap = "10px";
  button.style.padding = "15px";
  button.style.borderRadius = "10px";
  button.style.fontSize = "25px";
  button.style.border = "none";
  button.style.height = "auto";
  bottom.appendChild(button);
  i++;
}

// grid span 2 pour C et =
let clearButton = document.getElementsByTagName("button")[0];
clearButton.style.gridColumn = "span 2";

let equalbutton = document.getElementsByTagName("button")[17];
equalbutton.style.gridColumn = "span 2";

//style.buttons
const greyButtonsIndex = [0, 1, 2, 6, 10, 14];
for (let i = 0; i < greyButtonsIndex.length; i++) {
  const greyButtons =
    document.getElementsByTagName("button")[greyButtonsIndex[i]];
  greyButtons.style.backgroundColor = "#a8a8a7";
}

const equalButton = document.getElementsByTagName("button")[17];
equalButton.style.backgroundColor = "#1c8ced";

///////////////////////////// GO ///////////////////////////////////////////

//3. Array vide dans laquelle on va push la valeur de ce sur quoi on click...
let myInputs = [];
let accumulativeInputs;
function computeResult(input) {
  return Function("return " + input)(); ///!!! return espace avant les guillemets!!!!
}
/* function percentages(input) {
  additionne les valeurs qui précèdent le % et les /100
} */

//2.callback
//2.1. push les inputs dans un array vide --> console.log (myInputs) pour visualiser l'array
//2.2. déclare myInput.join("") pour ensuite les afficher sans la ","
//2.3. if, else if, else

let calculate = (button) => {
  const input = button.textContent;
  if (input === "C") {
    outputScreen.innerText = "";
    operationScreen.innerText = "";
    myInputs = [""];
  } else if (input === "=") {
    operationScreen.append(outputScreen.innerText);
    outputScreen.innerText = computeResult(accumulativeInputs);
  } /* else if (input === "%") {
    outputScreen.innerText = percentages(accumulativeInputs);
  }  */ else {
    myInputs.push(input); //console.log(myInputs) pour visualiser l'array
    accumulativeInputs = myInputs.join(""); //console.log(accumulativeInputs) pour visualiser les opérations
    outputScreen.innerText = accumulativeInputs;
  }
};

//1. eventListener sur chaque bouton --> callback (step2)
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  //forEach ne fonctionnerait que sur des élmts html????
  button.addEventListener("click", () => calculate(button)); //soit {}, soit fct directement
});

let rigth_screen = document.getElementsByTagName("div:nth-child[2]");
rigth_screen.style.border = "2px solid black";

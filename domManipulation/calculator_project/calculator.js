//////////////////////////////////BRAINSTORM//////////////////////////////////
//Container calculatrice : 
// div top : écran
// div bottom : keys = buttons
//                     --> eventlistener sur chacune (click + sa fonction propre)   --> e.preventdefault() pour empecher que le formulair soit submit et que la page se recharge a chaque click
// (facultatif : sur gr écran bottom : 2 div (normal + scientifique))

//////////////////////////////////TODO before I start //////////////////////////////////
//se renseigner sur les attributs des buttons

//////////////////////////////////WHATODOOO//////////////////////////////////
//1. HTML + CSS de base
//2. AddEventListener sur tous les boutons
//   ---> si bouton est chiffre : valeur du chiffre
//   ---> si bouton est opérateur : 



let container = document.querySelector("main")
let myCalculator = document.createElement("div")
let topScreen = document.createElement("div")
let operationScreen = document.createElement("div")
let outputScreen = document.createElement("div")
let bottom = document.createElement("div")

outputScreen.innerText = 0
topScreen.appendChild(outputScreen)
topScreen.appendChild(operationScreen)
/* bottom.appendChild(key) */
myCalculator.appendChild(topScreen)
myCalculator.appendChild(bottom)
container.appendChild(myCalculator)


//création des boutons
var i = 0
const myKeys = ["C", "%", "/", 7, 8, 9, "X", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="]

while (i < 18) {
  var button = document.createElement("button");

  var buttonContent = myKeys[i]
  
  button.textContent = buttonContent ;
  bottom.appendChild(button);

  i++;
}

// Attribuer classe aux boutons chiffres
const arrayOfNumbers = [3, 4, 5, 7, 8, 9, 11, 12, 13, 15]  //créer une array avec les index des boutons cibles

for (let i = 0; i < arrayOfNumbers.length; i++) {
  /* const index = arrayOfNumbers[i] */
  const numButton = document.getElementsByTagName("button")[arrayOfNumbers[i]];  //on séléctionne les boutons qui correspondent a ces index
  numButton.classList.add("numKey")                                              // classList.add()
}





////////////////// Procédé ///////////////////////////
/* 
1. createElement + appendChil() + while loop pour créer les boutons
2. 
 */






///////////////// DONNE PAR DIOGO /////////////////

/* function computeResult(str){
    return Function('return ' + str)()
  }
  
  const a = '(13 + 17) / 3'
  
  console.log(computeResult(a)) // Should display 10 */



///////////////// FACULTATIF /////////////////

/* 
Make it pretty : naaaaah!
Create an history of the previous operations  : div supplémentaire a droite avec console log (a déterminer)
Scientific calculator (trigonometry, logarithms, ...). The Math library is pretty convenient for this (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) : div supplémentaire gauche ssi affichage sur gr écran
Unit conversion (could be money or imperial units to metric system for example) : ajouter un boutton "curseur" --> eventlistener fct est une opération de conversion qui opere sur tout le code?
Pressing enter to display the result (same as pressing the = button) : eventListener keydown Enter, fonction = calculate?
Pressing number keys on the keyboard should have the same effect as pressing the calculator buttons : idem
Is it responsive? It'd better be! naaaaaaaaah!
*/
/* Let's create a simple Whack-A-Mole clone.

The goal of this traditional game is to prevent "moles" from coming out the ground with a hammer. 

Every second a new "mole" appears and you'll have to click on it to gently tell her to go back into the soil where it belongs. 

You can simply display circle <div>s to begin with. 

Everytime you click on a mole, your score increases.

If you'd like to spice things up, you can create an increasing difficulty by reducing the timeframe in which the mole appears.

Here is a badly drawn example to get you started. Let's do this! */

////////////////////////////////////BRAINSTORM///////////////////////////////////////////////
// 1. une mole apparait toutes les secondes : bouton, setInterval(helloMole, 1000), color : blue

let moles = document.getElementById("field");
let score = document.querySelector("p"); //("#score p")
let scoreTotal = 0;

let indexCopy = 0;

const pop = () => {
  moles.children[indexCopy].id = "hole";
  let index = Math.floor(Math.random() * moles.childElementCount);
  indexCopy = index;
  moles.children[index].id = "mole";
};

setInterval(pop, 2000);

for (let circle of moles.children) {
  circle.addEventListener("click", () => {
    if (circle.id === "mole") {
      scoreTotal += 1;
      console.log(scoreTotal);
      score.innerText = scoreTotal.toString();
    }
  });
}

// 2. On click dessus :
//          1) EventListener qui ...
//          2) change la couleur de ma taupe en rouge
//          3) Ajoute un point a #scoreforEach score ++
// 3. Arret du jeu apres 1 minutes : clear interval(endOfGame, 60000)
// 4. setTimeout(displayScore, 6000)

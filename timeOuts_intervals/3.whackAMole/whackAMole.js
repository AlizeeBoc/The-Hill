/* Let's create a simple Whack-A-Mole clone.

The goal of this traditional game is to prevent "moles" from coming out the ground with a hammer. 

Every second a new "mole" appears and you'll have to click on it to gently tell her to go back into the soil where it belongs. 

You can simply display circle <div>s to begin with. 

Everytime you click on a mole, your score increases.

If you'd like to spice things up, you can create an increasing difficulty by reducing the timeframe in which the mole appears.

Here is a badly drawn example to get you started. Let's do this! */

////////////////////////////////////HOWTO?!!!///////////////////////////////////////////////
/* 

// 1. setInterval (pop, 1500)

// 2.  const pop = () =>

    // On génère un index random pour que ...
    // ... l'enfant de field avec cet index prend l'id "mole".
    //  -->A la prochaine "itération", avant qu'un autre index ne soit généré, la mole doit reprendre son id="hole"
    // On déclare un indexReset = 0 hors de la fct
    // On lui attribue la valeur de l'index
    // A la prochaine "itération", l'enfant de field avec cet indexReset, cad l'ancienne mole, reprend l'id hole. 

// 3. 
    */

////////////////////////////////NOTIONS DECOUVERTES A APPROFFONDIR//////////////////////////
//        >> childElementCount

let field = document.getElementById("field");
let score = document.querySelector("p"); //("#score p")
let scoreTotal = 0;

let indexReset = 0;

const pop = () => {
  field.children[indexReset].id = "hole";
  let index = Math.floor(Math.random() * field.childElementCount);
  field.children[index].id = "mole";
  indexReset = index;
};

const myGame = setInterval(pop, 1500);

for (let circle of field.children) {
  circle.addEventListener("click", () => {
    if (circle.id === "mole") {
      scoreTotal += 1;
      console.log(scoreTotal);
      score.innerText = "Total : " + scoreTotal.toString();
    }
  });
}

//quelle différence avec const stopGame = clearInterval(myGame)

const stopGame = () => {
  clearInterval(myGame);
};

setTimeout(stopGame, 60000);


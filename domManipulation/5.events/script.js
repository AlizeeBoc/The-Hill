const _initTime = Date.now()

const getElapsedTime = () => {
return Number((Date.now() - _initTime) / 1000).toFixed(2) + 's'
}

const clickOnSquare = (event) => { 
    console.log(event.target.classList.value)            //fct clickOnSquare appelée lorsqu'un U clic sur bouton
    console.log(event.target.classList[1])    // "event.target" evt de l'elmt cliqué : la 2eme classe est selectionnée. [console.log(event) pour voir tous les events de l'elmt cliqué]
    console.log(getElapsedTime())
}

const array_squares = document.querySelectorAll('.actionsquare') //selection de tous les elemts dont class=actionsquare
for (let square of array_squares) {                              //)Pour chacun de ces elements 
  square.addEventListener('click', clickOnSquare)                // Un écouteur d'évt est ajouté tel que chaque fois qu'un clic sur button, exécution de la fonction "clickOnSquare"
}




// Everytime the user clicks on one of the action squares
// Create a new <div> with a class .displayedsquare and the corresponding clicked color in the div above (.displayedsquare-wrapper)
// Create a new <li> in the log below to state when the action was done


const actionSquare = (event) => {
    const topDiv = document.querySelector(".displayedsquare-wrapper");
    const newDiv = document.createElement("div");
    topDiv.appendChild(newDiv);
    newDiv.classList.value=event.target.classList.value;
    const arrayOfSquares = document.querySelectorAll(".actionsquare")
for (let square of arrayOfSquares) {
    square.addEventListener('click', actionSquare);
}
}

const arrayOfSquares = document.querySelectorAll(".actionsquare")
for (let square of arrayOfSquares) {
    square.addEventListener('click', actionSquare);
}






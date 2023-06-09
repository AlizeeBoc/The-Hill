const _initTime = Date.now()

const getElapsedTime = () => {
return Number((Date.now() - _initTime) / 1000).toFixed(2) + 's'
}
/* 
const clickOnSquare = (event) => { 
    console.log(event.target.classList.value)            //fct clickOnSquare appelée lorsqu'un U clic sur bouton
    console.log(event.target.classList[1])    // "event.target" evt de l'elmt cliqué : la 2eme classe est selectionnée. [console.log(event) pour voir tous les events de l'elmt cliqué]
    console.log(getElapsedTime())
}
*/

// Everytime the user clicks on one of the action squares
// Create a new <div> with a class .displayedsquare and the corresponding clicked color in the div above (.displayedsquare-wrapper)
// Create a new <li> in the log below to state when the action was done


const actionSquare = (event) => {
    const container = document.querySelector(".displayedsquare-wrapper");
    const newDiv = document.createElement("div");
    container.appendChild(newDiv);
    newDiv.classList.value=event.target.classList.value;
    newDiv.addEventListener('click', actionSquare);

    const actionLog = document.querySelector("main ul");
    const newLi = document.createElement("li");
    console.log(event);
    actionLog.appendChild(newLi);
    newLi.innerText = "["+ getElapsedTime() + "] " + "Created a new " + event.target.classList[1] + " square" ;
    
}

const arrayOfSquares = document.querySelectorAll(".actionsquare")
for (let square of arrayOfSquares) {
    square.addEventListener('click', actionSquare);
}


//1. Quand on clique sur un div, on veut une action (ADD EVENT LISTENER): 
// 1.1. Cibler les squares avec la classe .actionsquare --> .querySelectorAll(".")
// 1.2. for ... of loop sur ma classe cible             --> .addEventListener("paramètre", callBack))

// 2. Quelle action? Créer une nouvelle div avec la même classe que la div cible... a chaque fois
//  2.1. Cibler le container        --> .querySelector("")
//  2.2. Créer la div               --> document.createElement("div")
//  2.3. L'ajouter au container     --> appendChild()
//  2.4. Attribuer une classe à cette div (.classList.value) = la valeur (.value) de la classe (.classList) de l'élement sur lequel on a (.target) cliqué (event)
//                               --> .classList.value=event.target.classList.value
//  2.5 ... Tout mettre dans une fonction 

//3. Si on veut afficher dans une liste, le moment ou le carré a été crée :
// 3.1. On cible le lieu ou on va créer notre liste.
// 3.2. On crée notre liste
// 3.3. On l'ajoute
// 3.4. on ajoute le texte avec le event.target.classList[1] pour la couleur et en appelant la fonction pour le temps.


let body = document.body;

const getRandomColor = () => ('#' + parseInt(Math.random() * 0xffffff).toString(16));

body.addEventListener("keydown", (event) => {
    console.log(event)
    if (event.code === "Space"){                //https://www.toptal.com/developers/keycode
        body.style.backgroundColor = getRandomColor()
        const myListSpaceBare = document.querySelector("ul")
        const itemSpaceBare = document.createElement("li")
        itemSpaceBare.innerText = '[' + getElapsedTime() + ']' + "Someone pressed the spacebar here!"
        myListSpaceBare.appendChild(itemSpaceBare)
        
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyL") {
        while (document.querySelectorAll("li").length > 0) {
            document.querySelector("li").remove();
        }
    }
})



/* 
body.addEventListener("keydown", changeBackground)
console.log(myEvent);
console.log(KeyboardEvent, keyCode)
 */

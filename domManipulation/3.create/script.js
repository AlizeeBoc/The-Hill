//in the <article> (const, sélectionner article)
//Modify the script.js to create a new <section> (const2, document.createElement("section"))
// --> const.append(const2)
// --> const2.innerText = "blablabla"
//with a random background-color for each learner in your group. 
//This section should contain a paragraph with the name of the learner. 
//


const array = ["Lucie", "Antoine", "Leila", "Florentina"];
const noeud = document.querySelector("article");


for(let i=0; i<array.length; i++) {
    const sec = document.createElement("section");
    if(Math.random()<0.5){
        noeud.appendChild(sec);  
    } else {
        var lastOne = document.querySelector("section")
        noeud.insertBefore(sec, lastOne);
    }

    let paragraphs = document.createElement("p");
    sec.appendChild(paragraphs);                            //AppendChild crée un noeud, donc attention si texte uniquement à ajouter!   position.lastChild.appendChild(p)
    paragraphs.textContent = array[i];

    let colorRandom = [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
    sec.style = `background-color: rgb(${colorRandom})`;

    if(colorRandom[0]<128) {
        paragraphs.style.color = "white";
    }
    else {
        paragraphs.style.color = "black";
    } 
}



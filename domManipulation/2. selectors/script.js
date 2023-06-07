/*
Add a title attribute to every element that has the important class, stating This is an important item. Tip: adding a title attribute to an element is different from changing the title of a document.
*/
var elements = document.getElementsByClassName("important");
for (var i=0; i<elements.length; i++) {
    var element = elements[i];
    element.setAttribute("title", "This is important");
}
 /* --> Si uniquement premier element :
var element = document.getElementsByClassName("important")[0];
element.setAttribute("title", "This is important");
*/

/* Select all the img tags and loop through them. If they have no important class, turn their display property to none*/
var imgElements = document.getElementsByTagName("img");
for (let i=0; i<imgElements.length; i++) {
    var img = imgElements[i];
    if(!img.classList.contains("important")) {
        img.style.display="none";
    }
}

/*Loop through all the paragraphs and display their content in the console. If the paragraph has a class, display its classname as well*/

var paragraphs = document.getElementsByTagName("p");
for (let i = 0; i<paragraphs.length; i++) {
    var para = paragraphs[i];
    console.log(para.textContent);
    if (para.className) {            //  if (para.className != "" ) {
        console.log("classname: ", para.className);
    }
}

/*Give each of the paragraph a random text color (different for each one) UNLESS it has a class then leave it as it is.*/
/* 1) Selectionner les paragraphes
2) For chaque paragraphes
    s'ils n'ont pas de classe, styliser leur CSSCounterStyleRule;
3)Tout mettre dans une fonction
4)Appeler la fonction */


function randomColorParagraphs () {
    var paragraphs = document.getElementsByTagName("p");

    for (var i = 0; i<paragraphs.length; i++) {
        var paragraph = paragraphs[i];

        if(!paragraph.classList.length) {
            var red = Math.floor(Math.random()*256); // const array = [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)]
            var green = Math.floor(Math.random()*256);
            var blue = Math.floor(Math.random()*256);

            paragraph.style.color = `rgb(${red}, ${green}, ${blue})`; // paragraph.style.color = `rgb(${array[0]}, ${array[1]}, ${array[2]})`
        }
    }
}

randomColorParagraphs();




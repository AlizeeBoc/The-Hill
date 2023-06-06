//Display the document title in the console
var title = document.title;
console.log(title);


// Change the document title to Modifying the DOM
var titleDoc = document.querySelector("title");
titleDoc.textContent = "Modifying the DOM";

//Change the background color of the body to hot pink (#FF69B4). If that worked, try with a random color as an extra challenge. (tip: You can use the rgb() notation and 3 random-generated numbers between 0 and 255).
var body = document.body;
body.style.backgroundColor = "#FF69B4";

var body = document.body;
body.style.backgroundColor = "#8c9fab";


//Random color a chaque relance :
var red = Math.floor(Math.random()*256);
var green = Math.floor(Math.random()*256);
var blue = Math.floor(Math.random() * 256);

var randomColor = `rgb(${red},${green},${blue})`;  // ou: var randomColor = "rgb("+red+", "+green+", "+blue+")";
body.style.backgroundColor = randomColor;


//Using the children method and a for ... of  loop, display every children elements of the second child element of your document (display all children elements of the <body>)
/* essai :
const elements = document.children[0].children[1];
for (var i = 0; i < elements.length; i++) {
  var children = elements[i];
  console.log(children.textContent);
}  */

const secondChild = document.children[0].children[1];
for (const child of secondChild.children) {     //for (varianle of iterable) {
  console.log(child);                              //     instructions
}                                                   //}



















// Avec William :

//let i = 0
//     while (i<50){
//         setTimeout(function() {
//             var red = Math.floor(Math.random()*256);
//             var green = Math.floor(Math.random()*256);
//             var blue = Math.floor(Math.random() * 256);
//             var randomColor = `rgb(${red},${green},${blue})`;
//             body.style.backgroundColor = randomColor;
//         },1000)
//         i += 1;
//     }

/*     var i = 1;                  //  set your counter to 1

    function myLoop() {         //  create a loop function
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called
        var red = Math.floor(Math.random()*256);
        var green = Math.floor(Math.random()*256);
        var blue = Math.floor(Math.random() * 256);
        var randomColor = `rgb(${red},${green},${blue})`;
        body.style.backgroundColor = randomColor;
        i++;                    //  increment the counter
        if (i < 10) {           //  if the counter < 10, call the loop function
          myLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
       }, 1000)
    }
    
    myLoop();  */ 
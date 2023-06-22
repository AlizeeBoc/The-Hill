//////////////////// TODO //////////////////////////////
/* Use this file as a reference to build a maze. 

* are walls, . are paths, S is the starting point of the player and T is the treasure you should reach in order to end the game.
Create a maze.css file, you'll have to create styles for the 2 types of terrain (walls and paths), it can be simple background colors for starter.

Using the keyboard you can navigate in the maze (you can only stay on paths, you cannot cross walls)
The first level looks like this (starting as a red tile, treasure as a yellow tile) */

//on va ...

const LEVEL_1 = [
  ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", ".", "*"],
  ["*", "S", ".", ".", ".", ".", ".", "*", "*", ".", "*", ".", "T"],
  ["*", "*", "*", "*", "*", ".", ".", ".", ".", ".", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", ".", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", ".", "*"],
  ["*", "*", "*", "*", "*", ".", ".", ".", ".", ".", ".", ".", "*"],
  ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", "*", "*"],
  ["*", ".", ".", ".", ".", ".", ".", ".", ".", ".", "*", "*", "*"],
  ["*", ".", "*", "*", "*", "*", "*", "*", ".", ".", ".", "*", "*"],
  ["*", ".", ".", ".", ".", "*", "*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
];

const LEVEL_2 = [
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    ".",
    ".",
    "S",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "*",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    ".",
    "*",
  ],
  [
    "*",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "*",
  ],
  [
    "*",
    ".",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "T",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
];

const LEVEL_3 = [
  ["*", "*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "S", "*", "*", "*"],
  ["*", "*", "*", "*", ".", "*", "*", "*"],
  ["*", "*", "*", "*", ".", "*", "*", "*"],
  ["*", "*", "*", "*", ".", "*", "*", "*"],
  ["*", ".", ".", ".", ".", ".", ".", "*"],
  ["*", ".", "*", "*", "*", "*", ".", "*"],
  ["*", ".", ".", "*", "*", "*", ".", "*"],
  ["*", ".", ".", "*", "*", "*", ".", "*"],
  ["*", "*", ".", "*", "*", "*", "*", "*"],
  ["*", "T", ".", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*", "*"],
];

let body = document.body;

let myMain = document.querySelector("main");
let container = document.createElement("div");
container.setAttribute("id", "container");
myMain.appendChild(container);

/* let tiles_layer = document.createElement("div");
let objects_layer = document.createElement("div");

tiles_layer.setAttribute("id", "tiles")
objects_layer.setAttribute("id", "object") */
/* container.appendChild(tiles_layer);
container.appendChild(objects_layer); */
console.log("hello");

const createCell = () => {
  for (let y = 0; y < 12; y++) {
    //!!! ordre!!! On scanne chaque rang, de la 1re a la derniere colonne!!!
    for (let x = 0; x < 13; x++) {
      const cell = document.createElement("div");
      if (LEVEL_1[y][x] === "*") {
        cell.classList.add("wall");
      } else if (LEVEL_1[y][x] === ".") {
        cell.classList.add("path");
      } else if (LEVEL_1[y][x] === "S") {
        cell.setAttribute("id", "start");
      } else {
        cell.setAttribute("id", "treasure");
      }
      cell.innerText = "hello";
      cell.classList.add("cell");
      container.appendChild(cell);
      // addEventListener("keydown", travel);
    }
  }
};

createCell();

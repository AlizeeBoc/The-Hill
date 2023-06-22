//Exercise 1 : Write a function that mimics the behaviour of a typewriter. Using setInterval display the word prout one character at a time (one letter per second). Once the word is written on the screen clear the interval.


const letters = ["P", "r", "o", "u", "t"];
let i = 0;

const display = () => {
  if (i < letters.length) {
    console.log(letters[i]);
  }
  i++;
};

display();

setInterval(display, 1000);

let stopInterval = () => {
  clearInterval();
};

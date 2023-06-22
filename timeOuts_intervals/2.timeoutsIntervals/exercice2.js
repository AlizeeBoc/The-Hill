// Write a function that displays every second that has passed on the page since it was opened.
//The display should be refreshed every second.
//If 60 seconds are elapsed, write "a minute has passed", then "2 minutes have passed" (for 120 seconds and more), etc.

let counter = document.getElementById("counter");
let seconds = 0;

const count = () => {
  seconds += 1;
  counter.innerText = seconds + " secondes";
};

setInterval(count, 1000);

let minCounter = document.getElementById("minutesCounter");
console.log(minCounter);
let minutes = 0;

const minutesCounter = () => {
  minutes += 1;
  if (minutes <= 1) {
    minCounter.innerText = "A minute has passed";
  } else {
    minCounter.innerText = minutes + " minutes have passed";
  }
};

setInterval(minutesCounter, 5000);

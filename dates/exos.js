/* /////////////////////////////////////////Exercise 1////////////////////////////////////////////////////////
Find the timezones of :

Anchorage (USA)
Reykjavik (Iceland)
Saint-Petersburg (Russia)

And display the date and time of these cities along with the time and date of Brussels. */

let date = new Date();

let anchorageDate = date.toLocaleString("en-US", {
  timezone: "America/Anchorage",
}); // toLocaleString() returns a date as a string, using locale settings:
let reykjavikDate = date.toLocaleString("en-US", {
  timeZone: "Atlantic/Reykjavik",
});
let petersburgDate = date.toLocaleString("en-US", {
  timeZone: "America/Indiana/Petersburg",
});

console.log("A Anchor : ", anchorageDate);
console.log("A Reykjavik : ", reykjavikDate);
console.log("A Saint-Pertersbourg : ", petersburgDate);

let brusselsDate = new Date();
console.log("A Bruxelles : ", brusselsDate.toLocaleString());

// toLocaleString()
// toLocaleDateString()
// toLocaleTimeString()

/////////////////////////////////////////Exercise 2////////////////////////////////////////////////////////
// Exercise 2
// Using timestamps, find how many days have passed since the date of your birth. Feeling old, yet?

const naissance = new Date("1985-12-04");
const timeStampNaissance = naissance.getTime(); //ms ecoulées entre 70 et ma naissance
const timeStampNow = new Date().getTime();
const ageEnJours = Math.floor(
  (timeStampNow - timeStampNaissance) / 1000 / 3600 / 24
);
console.log(ageEnJours + " passés sur cette terre");

// Write a function to find how many days have passed since any point in time (after 1970).
//today-thisDate = Math.floor(intervale en ms)/1000/3600/24

function daysPassed(string) {
  var epoch = new Date("1970-01-01");
  var dateRandom = new Date(string);
  var msPassed = dateRandom.getTime() - epoch.getTime();
  var daysPassed = Math.floor(msPassed / (1000 * 3600 * 24));
  return daysPassed;
}

console.log(daysPassed("1970-01-10"));


// Exercise 3
/* Using timestamps, find the exact time and date we will be in 80000 hours.

Write a function to display the time and date for any amount of hours given in the future. 
Create a number input for the hours and listen for keyup events, dynamically display the date in the number of hours given by the input. */

let now = new Date()
let nowTimeStamp = now.toLocaleString()
let thenTimeStamp = nowTimeStamp + 
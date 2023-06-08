/* Select the last child of the <ol> tag and put it at the beginning of the list
Delete the last section from the DOM, we don't need it anyways */

const myList= document.querySelector("ol");
const moovingKid = myList.lastElementChild;
myList.insertBefore(moovingKid, myList.firstElementChild);

/*Move the <h2> of the third section in the second one and vice-versa*/

const myTitle2 = document.querySelector("section:nth-child(2) h2");
const myTitle3 = document.querySelector("section:nth-child(3) h2");
const secondSection = document.querySelector("section:nth-child(2)");
const thirdSection = document.querySelector("section:nth-child(3)");

secondSection.insertBefore(myTitle3, secondSection.firstElementChild);
thirdSection.insertBefore(myTitle2, thirdSection.firstElementChild);

/* Delete the last section from the DOM, we don't need it anyways  */

/* const lastSection = document.querySelector("") */


const lastSection = document.querySelector("main");
lastSection.lastElementChild.remove();


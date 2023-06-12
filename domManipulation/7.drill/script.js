//Use childNodes to list all the children from the <ul>

const myList = document.querySelector("ul")
console.log(myList.textContent)

/* Write a for loop to iterate over every child. In this loop:
Use a condition in the loop to only iterate over element nodes (see: nodeTypes. Use child.nodeType === 1)
Find the element that contains Fast and Furious. If it's not the first element move it to the top of the list
Since Fast and Furious is the most important franchise ever, add a class .important to the element
Add an eventListener on every item of the list. If the item is clicked an alert() pops up to display the name of clicked element
Add a special condition to the previous function if the clicked item is Fast and Furious the alert() should display The most important franchise ever, the story of DOM(inic) Toretto's family. It's not about car, it's about family.
(*) Remove duplicates using removeChild (duplicates are items with the exact same textContent, isEqualNode might be useful).
 */

const childNodes = myList.childNodes
for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].nodeType===1 && childNodes[i].innerText === "Fast and Furious") {
        myList.insertBefore(childNodes[i], myList.firstElementChild) 
        myList.firstElementChild.classList.add("important")
    }
}
// Add a keyup listener on the first input field, so that once you type a letter in this field, it goes into the <span id="display-firstname">. 
// The content of the field and the span should always remain the same.


const firstName = document.getElementById("firstname")

firstName.addEventListener("keyup", (event) => {
    const span = document.getElementById("display-firstname")
    span.textContent = firstName.value
})


// Add a keyup listener on the second input (the number input), 
// so that if the age is below 18 the content of the section a-hard-truth remains hidden, 
//otherwise show them this hard to swallow fact.

/* const age = document.getElementById("age")

age.addEventListener ("keyup", (event)=> {
    console.log(event.target.value)
    if (event.target.value > 18) {
        const hardTrue = document.getElementById("a-hard-truth")
        hardTrue.style = "visibility:visible";

    } else {
        const hardTrue = document.getElementById("a-hard-truth")
        hardTrue.style = "visibility:hidden";
    }

    }) 
    
Code ok, mais ne fonctionne pas si usage des flèches -----------> 
docu : evt change : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/change_event */



/* const ageInput = document.getElementById("age")

age.addEventListener ("change", (event)=> {
    displayAdvice(event);
})
age.addEventListener ("keyup", (event)=> {
    displayAdvice(event);
})


let displayAdvice = (event) => {
    if (event.target.value > 18) {
        const hardTruth = document.getElementById("a-hard-truth")
        hardTruth.style = "visibility:visible";

    } else {
        const hardTruth = document.getElementById("a-hard-truth")
        hardTruth.style = "visibility:hidden";
    }
} */

const displayAdvice = (event) => {
    if (event.target.value > 18) {
        const hardTruth = document.getElementById("a-hard-truth")
        hardTruth.style = "visibility:visible";

    } else {
        const hardTruth = document.getElementById("a-hard-truth")
        hardTruth.style = "visibility:hidden";
    }
}

const ageInput = document.getElementById("age")
let tab =['keyup', 'change']
tab.forEach(event => {
    console.log(event);
    ageInput.addEventListener(event, displayAdvice)
    })




/* Well this is a common one. Add a keyup listener on both fields 
and show a visual hint (for instance turn the field red) 
if the password is too short (less than 6 characters) or if the password and its confirmation do not match.
 */
/*     const pwd = document.getElementById("pwd")
    const confirmPwd = document.getElementById("pwd-confirm")

    pwd.addEventListener("keyup", (event) => {
        console.log(event)
        if (pwd.value.length<5 || (pwd.value != confirmPwd.value)) {
           pwd.style.backgroundColor = "red" 
        } else {
            pwd.style.backgroundColor = "white"
        }
    }) 
    --> Probleme avec ce code : c'est en entrant le pwd apres le confirm pwd que le rouge disparait : nécéssité d'ajouter une eventlistener sur mon confirmPWD
    */
    


    const verif = (event) => {
        if (pwd.value.length<5 || (pwd.value != confirmPwd.value)) {
            pwd.style.backgroundColor = "red" 
         } else {
             pwd.style.backgroundColor = "white"
         }
    }

    const pwd = document.getElementById("pwd")
    const confirmPwd = document.getElementById("pwd-confirm")

    pwd.addEventListener("keyup", verif)
    confirmPwd.addEventListener("keyup", verif)


//Finally, use a change listener on the <select> field to toggle a dark mode on the whole page. 
//For ease of use, we'll say that the dark mode is just turning the background black and the text white.


let toDarkMode = document.getElementById("toggle-darkmode")
toDarkMode.addEventListener("change", (event)=> { 
       
if (event.target.value == "dark") {
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
    } else {
        console.log("hello")
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
    }

}) 




// !!! document.body.style
// !!!! if (event.target.value = "dark") ---> assigne une valeur donc code ne fonctionne pas
//                           == "dark"
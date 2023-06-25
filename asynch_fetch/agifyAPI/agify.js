/* Exercise 2
Make a new page with a text input and a button. 
When the button is clicked, a fetch query is sent to the agify API with the name entered in the input. 
When the request is finished display the result in a new div on the page. 
Keep the the past requests on the page by creating a new div each time you make an API call. */

// ----> POST REQUEST

let body = document.body;
const submit = document.getElementById("submit");
submit.addEventListener("click", fetchDatas);

function fetchDatas() {
  const input = document.getElementById("name");
  const name = input.value;

  fetch(`https://api.agify.io?name=${name}`)        // Toc toc, t'as des infos la dessus?
    .then((response) => response.json())            // cool! then laisse moi voir
    .then((data) => {
                                                    // cool! Then on va créer une div avec ces datas
      const age = data.age;

      const myDiv = document.createElement("div");
      myDiv.textContent = `Name: ${name}, Age: ${age}`;
      body.insertBefore(myDiv, body.children[1]);
    })
    .catch((error) => console.log(error));            //Et si ca ne marche pas ...
}


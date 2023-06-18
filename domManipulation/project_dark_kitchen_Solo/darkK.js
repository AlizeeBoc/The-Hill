const meals = [
  {
    title: "Houmous",
    description:
      "Pois chiches moulus avec crème de sésame (ou huile de sésame) et citron",
    price: "7.00",
    picture: "pic/starters/houmous.png",
  },
  {
    title: "Moutabal",
    description: "Caviar d'aubergines grillées à la crème de sésame",
    price: "8.00",
    picture: "pic/starters/moutabal.png",
  },
  {
    title: "Tabouleh",
    description: "Salade typique libanaise à base de persil",
    price: "8.00",
    picture: "pic/starters/tabouleh.png",
  },
  {
    title: "Aish El Saraya",
    description:
      "À base de biscotte non salé, du lait concentré et sirop de caramel du chef",
    price: "4.50",
    picture: "pic/dessert/aishelsaraya.png",
  },
  {
    title: "Baklawa",
    description: "À base de semoule, de noix de coco et amandes",
    price: "2.50",
    picture: "pic/dessert/baklawa.png",
  },
  {
    title: "Namoura",
    description: "Salade typique libanaise à base de persil",
    price: "2.50",
    picture: "pic/dessert/namoura.png",
  },
];

let createCard = (food) => {
  const container = document.getElementById("mealsContainer");
  const oneMealCard = document.createElement("div");
  const textCard = document.createElement("div");
  const mealTitle = document.createElement("h3");

  const mealDescription = document.createElement("p");

  const price = document.createElement("p");
  const illu = document.createElement("div");

  mealTitle.innerText = food.title;
  textCard.append(mealTitle);
  mealDescription.innerText = food.description;
  textCard.append(mealDescription);
  price.innerText = food.price;
  textCard.append(price);
  textCard.setAttribute("id", "text");
  oneMealCard.append(textCard);
  illu.style.backgroundImage = `url(${food.picture})`;
  illu.style.backgroundSize = "cover";
  illu.setAttribute("id", "images");
  oneMealCard.append(illu);
  oneMealCard.setAttribute("id", "container_flex");

  const index = Array.from(container.children).length;
  if (index < 3) {
    oneMealCard.classList.add("starter");
  } else if (index >= 3) {
    oneMealCard.classList.add("dessert");
  }

  container.append(oneMealCard);
};

meals.forEach((food) => {
  createCard(food);
});

let hideDesserts = false;
let hideStarters = false;

const hide = (e) => {
  if (e.target.innerText === "Starters") {
    hideDesserts = true;
    const dessert = document.getElementsByClassName("dessert");
    for (let i = 0; i < dessert.length; i++) {
      dessert[i].style.display = "none";
    }
    if (hideStarters) {
      const starter = document.getElementsByClassName("starter");
      for (let i = 0; i < starter.length; i++) {
        starter[i].style.display = "";
      }
      hideStarters = false;
    }
  } else if (e.target.innerText === "Desserts") {
    hideStarters = true;
    let starter = document.getElementsByClassName("starter");
    for (let i = 0; i < starter.length; i++) {
      starter[i].style.display = "none";
    }
    if (hideDesserts) {
      const dessert = document.getElementsByClassName("dessert");
      for (let i = 0; i < dessert.length; i++) {
        dessert[i].style.display = "";
      }
      hideDesserts = false;
    }
  } else if (e.target.innerText === "All") {
    if (hideDesserts || hideStarters) {
      const dessert = document.getElementsByClassName("dessert");
      for (let i = 0; i < dessert.length; i++) {
        dessert[i].style.display = "";
      }
      hideDesserts = false;

      const starter = document.getElementsByClassName("starter");
      for (let i = 0; i < starter.length; i++) {
        starter[i].style.display = "";
      }
      hideStarters = false;
    }
  }
};

//quand click sur une catégorie, les autres sont cachées
const myCategories = document.querySelectorAll(".categories");
myCategories.forEach((categorie) => {
  categorie.addEventListener("click", hide);
});

////////////////////////////// difficultés rencontrées //////////////////////////
/* 
1.  illu.style.backgroundImage = `url(${food.picture})`;
2.  redimensionner mes images via css alors qu'elles font partie d'une div a laquelle j'avais déja attribué des valeurs via js
3. Attribuer une classe a mes premières cardes :
        const index = Array.from(container.children).length;
        if (index < 3) {
4. Bordel complet pour afficher les plats selon le bouton sur lequel on clique.
Logique a retenir : 
- 2 flags et pas 1
- si je clique sur starters, je cache mes desserts. Mais si mes starters sont cachés, je les affiche. Idem pour les desserts. Pour All : si l'un ou l'autre est caché, je l'affiche.
 */

import food from "/food.js";
console.log(food);

let foodCategories = Object.keys(food);

let foodContainer = document.getElementById("food-container");
let tagsContainer = document.getElementById("tags-container");
let shoppingCartContainer = document.getElementById("shop");
// function that will generate a card

let shopping_cart = {
  total_price: 0,
  shop_list: [],
};

// Shopl list items structure
// {
// 			name: "Vegan Burger",
// 			price: 2000
// 		}

let shoppingcartItems = document.getElementById("shop_list_items");
let totalPrice = document.getElementById("total_price");

const updateShoppingCart = (shopcartInfo) => {
  shoppingcartItems.innerHTML = "";
  shopping_cart.shop_list.forEach((selectedDish) => {
    let dish = document.createElement("li");
    dish.innerText = `${selectedDish.name} - ${selectedDish.price}€`;
    shoppingcartItems.append(dish);
  });

  totalPrice.innerText = `TOTAL - ${shopcartInfo.total_price}€`;
};

const createCard = (dishInfo) => {
  let mainCard = document.createElement("div");
  mainCard.classList.add("container");

  let mainImage = document.createElement("img");
  mainImage.src = dishInfo.img;

  let contentDiv = document.createElement("div");
  contentDiv.classList.add("content-box");

  let name = document.createElement("h4");
  name.classList.add("name");
  name.innerText = dishInfo.name;

  let description = document.createElement("p");
  description.innerText = dishInfo.dsc;

  let button = document.createElement("div");
  button.classList.add("btn");

  let price = document.createElement("h4");
  price.classList.add("price");
  price.innerText = dishInfo.price / 10;

  let addToBasket = document.createElement("a");
  addToBasket.innerText = "Add To basket";

  addToBasket.addEventListener("click", (event) => {
    // alert(`you are about to add a ${dishInfo.name} to your basket`)
    // shopping_cart.total_price = shopping_cart.total_price + (dishInfo.price/10)
    shopping_cart.total_price += dishInfo.price / 10;

    shopping_cart.shop_list.push({
      name: dishInfo.name,
      price: dishInfo.price / 10,
    });

    updateShoppingCart(shopping_cart);
  });

  button.append(price);
  button.append(addToBasket);

  contentDiv.append(name);
  contentDiv.append(description);
  contentDiv.append(button);

  mainCard.append(mainImage);
  mainCard.append(contentDiv);

  foodContainer.append(mainCard);
};

const createTags = (arrayOfCategories) => {
  arrayOfCategories.forEach((category) => {
    let tag = document.createElement("button");
    tag.innerText = category;
    tag.addEventListener("click", (event) => {
      foodContainer.innerHTML = "";
      food[category].forEach((sortedDish) => {
        createCard(sortedDish);
      });
      document.querySelector(".selected").classList.remove("selected");
      event.target.classList.add("selected");
    });

    tagsContainer.append(tag);
  });
};

createTags(foodCategories);
// Create a list of dishes that people will order online.

// Loop over all the categories of my "food object" to create cards and insert them into my html

foodCategories.forEach((foodCategory) => {
  food[foodCategory].forEach((dish) => {
    createCard(dish);
  });
});

// The website should be responsive, it should work on a standard mobile resolution and on desktop

// You must list the food using some sort of card templates

// You should categorize your food to be able to filter it (ex: vegan, comfort food)

// You should create a shopping cart component to display the selected dishes and display the total amount of the delivery

let openShop = document.getElementById("openShop");
let closeShop = document.getElementById("closeShop");

openShop.addEventListener("click", (event) => {
  shoppingCartContainer.classList.remove("closed");
});

closeShop.addEventListener("click", (event) => {
  shoppingCartContainer.classList.add("closed");
});

// You should create a dark mode switch, to toggle your design between a light and a dark mode

let tSwitch = document.querySelector(".slider ");

tSwitch.addEventListener("click", (event) => {
  // if(Array.from(document.body.classList).includes('darkmode')){
  document.body.classList.toggle("darkmode");
  console.log("clicked");
  // }else{
  // 	document.body.classList.add('darkmode')
  // }
});
// ["Vegan Burger - 15€", "Vegan Burger - 15€"]

//array = []
//1.0. createElement pour l'html
//1. append (! ordre) ---> 2. innerText
//3. style
//4. function
//5. forEach

const cocktails = [
    {
        picture : "https://i0.wp.com/drinksadventures.com.au/wp-content/uploads/2020/07/Teeling-Irish-Whiskey-Single-Pot-Stll-Casks.jpg?resize=730%2C487&ssl=1",
        type : "Sweet & Sour, Smokey, Silky",
        name : "Penicilin 2.0",
        price : "12 e",
        ingredients : "Teeling Pot Irish Wiskey, Ginger wine, Pollen, Honey, Earl Grey Tea, Verjuice, Peated Scotch Spray, Clarified With Greek Yogurt",  
    },

    {
        picture : "https://images.jumpseller.com/store/aquavitae/3281055/Ron-P-Original-Dark.jpg?1628813113",
        type : "Spicey Fresh, Mule Style",
        name : "Chaton",
        price : "14 e",
        ingredients: "Plantation Original Dark Rhum, Yuzushu Yuzu Liqueur, Verjuice, Ginger Beer (Ginger, Lemon, Chili, Peppers, Basil)",  
    },

    {       
        picture : "https://galumbi.de/wp-content/uploads/2016/10/Plantation-Pineapple-2-von-7-590x885.jpg",
        type : "Sour, Fruity, Bitter",
        name : "Winter Bird",
        price : "14 e",
        ingredients : "Plantation Pineapple Rhum, Ming River Baijiu, Nardini Acqua Di Cedro, Deyman Belgian Bitter, Verjuice",
        
    },

    {   picture : "https://donmezcal.es/wp-content/uploads/2021/03/Mezcal-montelobos-espadin-768x960.jpg",
        type : "Smocky, Strong, Bitter",
        name : "Oaxac'Ham",
        price : "14 e",
        ingredients: "Verde Mezcal, Antica Formula Vermouth, Cynar, Serano Ham, Verjuice",
    },

    {
        picture : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fboiremixologie.com%2Ffiles%2Fmedias%2FBACARDI-Reserva-Ocho-Ocho-Old-Fashioned.jpg&f=1&nofb=1&ipt=1c4cac332b82fcaee1aa0cdc980a7d2b7621f2aedd60b6975dadfcb1d5990410&ipo=images",
        type : "Sweet, Creamy, Dessert",
        name : "Pistachio",
        price : "14 e",
        ingredients : "Bacardi Ocho Rhum, Karukera Gold Rhum, Plantation 3 Stars Rhum, Pistachio Orgeat & Foam, Verjuice",
        
    },

    {
        picture : "https://www.thespiritofone.com/wp-content/uploads/2020/05/One-Sage-Apple-Gin-with-botanicals-1024x683.jpg",
        type : "Acidic, Herbal, Fruity",
        name : "Vote For Pedro",
        price : "13 e",
        ingredients : "Drouin Apple Gin, Drouin Blanche De Normandie (Apple Distilate), Pedro Ximenez Sherry Vinegar, Basil, Celery Bitters",
    },

    {
        picture : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fboiremixologie.com%2Ffiles%2Fmedias%2FBACARDI-Reserva-Ocho-Ocho-Old-Fashioned.jpg&f=1&nofb=1&ipt=1c4cac332b82fcaee1aa0cdc980a7d2b7621f2aedd60b6975dadfcb1d5990410&ipo=images",
        type : "Silky, Floral, Low Alcohol",
        name : "Galaxy Punch",
        price : "11 euros",
        ingredients: "Bombay Sapphire Gin, Valdespino Vermouth, Elderflower, Hibiscus, Lapsang Souchong Smoked Tea, Lime, Clarified With Soy Milk",
    },

    {
        picture : "https://fbworld.com/wp-content/uploads/2016/08/Cazadores-Blanco-1024x1024.jpg",
        type : "Dry, Herbal, Boozy",
        name : "Ultime Bafouille",
        price  : "13 e",
        ingredients : "Cazadores Blanco Tequila, Green Chartreuse, Valdespino Manzanilla Sherry, Verjuice",
        
    },

    {
        picture : "https://i.pinimg.com/736x/f0/75/73/f07573ab6b77341df73142a40ce45e96--grey-goose-vodka-vodka-martini.jpg",
        type : "Salty, Savoury, Seaweed",
        name : "Nori",
        price  : "14 e",
        ingredients : "Nori Infused Grey Goose Vodka, Sacred Dry Vermouth, St Germain Elderflower Liqueur, Verjuice, Umami Saline Solution",
        
    },

    {
        picture : "https://www.leshardis.com/wp-content/uploads/2020/09/ADRIATICO_AMARETTO_SOUR_Roasted_.jpg",
        type : "Sweet, Spicy, Dr Pepper-like",
        name : "Charles Pepper M.D.",
        price  : "14 e",
        ingredients : "Adriatico Amaretto, Plantation OFTD Overproof Rum, Cherry Heering, Verjuice, Vanilla Bitters, Peroni Italian Lager",
        
    },
]

// console.log(cocktails)
let createCard = (apero) => {                               // 4. On crée notre fonction. On remplace les "cocktails[o]"" par "apero" dans tout notre code.
    const container = document.getElementById("container")

    //one card
    const myCard = document.createElement("div")            // 1.0. On créé la card
    const topOfCard = document.createElement("div")
    const picture = document.createElement("img")           // 1.0. Divisée en deux parties : Top (illu) /Bottom (texte)
    const bottomOfCard = document.createElement("div")
    const headerOfBottom = document.createElement("div")    // 1.0. Bottom : header qui contient en h1 le nom et le prix du cocktail (flex))
    const titleName = document.createElement("h1")
    const titlePrice = document.createElement("h1")
    const contentOfBottom = document.createElement("div")   // 1.0. Bottom : contenu qui contient en h2 le type et en <p> la compo du cocktail
    const subtitle = document.createElement("h2")
    const paragraph = document.createElement("p")

    //Content of bottom
    subtitle.innerText=apero.type                                          /* 2.1. subtitle.innerText=cocktails[0].type */
    contentOfBottom.append(subtitle)                        // 1.1. On ajoute le content au bottom (!!ordre avec append())
    paragraph.innerText=apero.ingredients                                  /* 2.2. paragraph.innerText=cocktails[0].ingredients  */         
    contentOfBottom.append(paragraph)

    //TitleName/Price
    titleName.innerText = apero.name                                        /* 2.3. titleName.innerText = cocktails[0].name */
    headerOfBottom.append(titleName)                        // 1.2 Le nom (titleName) et prix (titlePrice) au header
    titlePrice.innerText = apero.price                                      /* 2.4. titlePrice.innerText = cocktails[0].price  */  
    headerOfBottom.append(titlePrice)

    //Bottom
    headerOfBottom.style.display = "flex"
    headerOfBottom.style.justifyContent ="space-between"
    bottomOfCard.append(headerOfBottom)                     // 1.3. Le header et le contenu au bas de carte
    bottomOfCard.append(contentOfBottom)

    //Top
    picture.src = `url(${apero.picture})`   // ???????????                  /* 2.5. picture.src = `url(${cocktails[0].picture})` */
    topOfCard.append(picture)

    //myCard
    myCard.style.border = "solid 1px black"
    myCard.style.width = "150px"
    myCard.style.padding = "10px"
    myCard.append(topOfCard)                                // 1.4. Le top et le bottom a notre carte
    myCard.append(bottomOfCard)

    //container
    container.style.display = "flex"
    container.style.flexWrap = "wrap"
    container.append(myCard)                                // 1.5. La carte au container

}
 cocktails.forEach((apero) => {                             // 5. forEach sur le paramètre de notre fonction
    createCard(apero)
 });




const randomCocktailUrl = "http://www.thecocktaildb.com/api/json/v1/1/random.php"

fetch(randomCocktailUrl)
    .then(res => res.json())
    .then((randomDrink) => addRandomDrink(randomDrink))

function addRandomDrink(randomDrink) {
    console.log(randomDrink)
    const main = document.querySelector('main')
    const img = document.createElement('img')
    // console.log(randomDrink.drinks[0].strDrink)
    img.src = randomDrink.drinks[0].strDrinkThumb
    main.append(img)
}
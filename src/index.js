const randomCocktailUrl = "http://www.thecocktaildb.com/api/json/v1/1/random.php"
function renderCocktails() {
    fetch(randomCocktailUrl)
        .then(res => res.json())
        .then(randomDrink => addRandomDrink(randomDrink))
}


function addRandomDrink(randomDrink) {
    const main = document.querySelector('main')
    const img = document.createElement('img')
    img.addEventListener('click', () => console.log('click'))
    const h4 = document.createElement('h4')
    h4.textContent = randomDrink.drinks[0].strDrink
    img.src = randomDrink.drinks[0].strDrinkThumb
    main.append(img, h4)
}

// render 5 random cocktails //
for (i=0; i < 5; i++) {
    renderCocktails()
}
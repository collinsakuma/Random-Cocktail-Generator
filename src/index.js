const randomCocktailUrl = "http://www.thecocktaildb.com/api/json/v1/1/random.php"
const renderFiveRandom = document.getElementById('renderFiveRandom')

// fetch random cocktail from API //
function renderCocktails() {
    fetch(randomCocktailUrl)
        .then(res => res.json())
        .then(randomDrink => addRandomDrink(randomDrink))
}

// create random drink and add to main //
function addRandomDrink(randomDrink) {
    const img = document.createElement('img')
    img.addEventListener('click', () => console.log('click'))
    const h4 = document.createElement('h4')
    h4.textContent = randomDrink.drinks[0].strDrink
    img.src = randomDrink.drinks[0].strDrinkThumb
    renderFiveRandom.append(img, h4)
}

// render 5 random cocktails //
function loadCocktails() {
    for (i=0; i < 5; i++) {
        renderCocktails()
    }
}

// Refresh Cocktails Button //
document.getElementById('regenerateCocktails').addEventListener('click', () => {
    renderFiveRandom.innerHTML = ""
    loadCocktails()
})
// renders 5 on page load//
loadCocktails()
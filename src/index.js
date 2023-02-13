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
    img.addEventListener('click', () => {
        document.getElementById('centerImage').src = randomDrink.drinks[0].strDrinkThumb
        document.getElementById('cocktailName').textContent = randomDrink.drinks[0].strDrink
        document.getElementById('instructionsText').textContent = randomDrink.drinks[0].strInstructions
    })
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

document.getElementById('languageSelect').addEventListener('change', changeLanguage)

function changeLanguage(e) {
    const cocktailName = document.getElementById('cocktailName').textContent
    const instructionsText = document.getElementById('instructionsText')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
        .then(res => res.json())
        .then((data) => {
            if (e.target.value === "English") {
                instructionsText.textContent = data.drinks[0].strInstructions
            } else if (e.target.value === "German") {
                instructionsText.textContent = data.drinks[0].strInstructionsDE
            } else if (e.target.value === "Italian") {
                instructionsText.textContent = data.drinks[0].strInstructionsIT
            } else if (e.target.value === "Spanish") {
                instructionsText.textContent = data.drinks[0].strInstructionsES
            }
        })
}
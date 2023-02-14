const randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const renderFiveRandom = document.getElementById('renderFiveRandom');
const numRandomCocktails = 5;

// renders 5 on page load
loadCocktails();

// render 5 random cocktails
function loadCocktails() {
    for (let i = 0; i < numRandomCocktails; i++) {
        renderCocktail();
    }
}

// fetch random cocktail from API
function renderCocktail() {
    fetch(randomCocktailUrl)
        .then(res => res.json())
        .then(randomDrink => addRandomDrink(randomDrink.drinks[0])) // drinks[0] contains drink object
}

// create random drink and add to main
function addRandomDrink(randomDrink) {
    const img = document.createElement('img');
    img.addEventListener('click', () => {
        document.getElementById('centerImage').src = randomDrink.strDrinkThumb;
        document.getElementById('cocktailName').textContent = randomDrink.strDrink;
        document.getElementById('instructionsText').textContent = randomDrink.strInstructions;
        const ul = document.getElementById('ingredientsList');
        ul.innerHTML = "";
        addIngredientsList(randomDrink, ul)
    })

    const h4 = document.createElement('h4');
    h4.textContent = randomDrink.strDrink;
    img.src = randomDrink.strDrinkThumb;
    renderFiveRandom.append(img, h4);
    
}


// Refresh Cocktails Button
document.getElementById('regenerateCocktails').addEventListener('click', () => {
    renderFiveRandom.innerHTML = ""
    loadCocktails();
})


document.getElementById('languageSelect').addEventListener('change', changeLanguage);

function changeLanguage(e) {
    const cocktailName = document.getElementById('cocktailName').textContent;
    const instructionsText = document.getElementById('instructionsText')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
        .then(res => res.json())
        .then((data) => {
            const drink = data.drinks[0];
            if (e.target.value === "English") {
                instructionsText.textContent = drink.strInstructions;
            } else if (e.target.value === "German") {
                instructionsText.textContent = drink.strInstructionsDE;
            } else if (e.target.value === "Italian") {
                instructionsText.textContent = drink.strInstructionsIT;
            } else if (e.target.value === "Spanish") {
                instructionsText.textContent = drink.strInstructionsES;
            }
        });
}


function addIngredientsList(randomDrink, ul) {
    console.log(randomDrink);
    let i = 1;
    const liData = [];
    
    while (randomDrink["strIngredient" + i.toString()] != null) {
        liData.push(randomDrink["strIngredient" + i.toString()]);
        i++;
    }

    // alphabetize ingredients with sort
    liData.sort((ingredient1,ingredient2) => ingredient1.localeCompare(ingredient2));

    // appends to list
    liData.forEach(li => {
        const liElement = document.createElement('li');       
        liElement.textContent = li;
        ul.append(liElement);
    })

    
    
}
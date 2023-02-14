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


// Language select Dropdown
document.getElementById('languageSelect').addEventListener('change', changeLanguage);

function changeLanguage(e) {
    const cocktailName = document.getElementById('cocktailName').textContent;
    const instructionsText = document.getElementById('instructionsText')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
        .then(res => res.json())
        .then((data) => dropdownLogic(data, instructionsText, e))
}

function dropdownLogic(data, instructionsText, e) {
    const drink = data.drinks[0];
    if (e.target.value === "English") {
        instructionsText.textContent = drink.strInstructions;
        if (drink.strInstructions === null) {
            instructionsText.textContent = 'English not Available';
        }
    } else if (e.target.value === "German") {
        instructionsText.textContent = drink.strInstructionsDE;
        if (drink.strInstructionsDE === null) {
            instructionsText.textContent = 'German not available';
        }
    } else if (e.target.value === "Italian") {
        instructionsText.textContent = drink.strInstructionsIT;
        if (drink.strInstructionsIT === null) {
            instructionsText.textContent = 'Italian not available';
        }
    } else if (e.target.value === "Spanish") {
        instructionsText.textContent = drink.strInstructionsES;
        if (drink.strInstructionsES === null) {
            instructionsText.textContent = 'Spanish not available';
        }
    }
}


function addIngredientsList(randomDrink, ul) {
    console.log(randomDrink);
    let i = 1;
    
    while (randomDrink["strIngredient" + i.toString()] != null) {
        const li = document.createElement('li');       
        li.textContent = randomDrink["strIngredient" + i.toString()];
        ul.append(li);
        i++; 

    }
    
}

// Search drink
const searchInput = document.getElementById('search')
searchInput.addEventListener('input', e => {
    const searchValue = e.target.value;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(res => res.json())
        .then((searchedDrink) => doSomething(searchedDrink, searchValue))
})

function doSomething(searchedDrink, searchValue) {
    searchedDrink.drinks.forEach(drink => {
        if ( drink.strDrink === searchValue) {
            document.getElementById('searchedDrink').textContent = drink.strDrink;
            document.getElementById('centerImage').src = drink.strDrinkThumb;
            document.getElementById('cocktailName').textContent = drink.strDrink;
            document.getElementById('instructionsText').textContent = drink.strInstructions;
            const ul = document.getElementById('ingredientsList');
            ul.innerHTML = "";
            addIngredientsList(drink, ul)
            console.log(drink.strDrinkThumb)
        }
    })
}

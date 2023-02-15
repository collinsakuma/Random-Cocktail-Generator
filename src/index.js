const randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const renderFiveRandom = document.getElementById('renderFiveRandom');
const numRandomCocktails = 5;


// renders 5 on page load
loadCocktails();


// renders first cocktail into middle card
window.onload = async function () {
    const result = await renderCocktail();
    document.querySelector('#renderFiveRandom').firstChild.click();
};

// render 5 random cocktails
function loadCocktails() {
    for (let i = 0; i < numRandomCocktails; i++) {
        renderCocktail();
    }
}

// fetch random cocktail from API
function renderCocktail() {
    return fetch(randomCocktailUrl)
        .then(res => res.json())
        .then(randomDrink => addRandomDrink(randomDrink.drinks[0])) // drinks[0] contains drink object

}

// create random drink and add to main
function addRandomDrink(randomDrink) {
    const img = document.createElement('img');
    img.addEventListener('click', () => {
        document.getElementById('languageSelect').selectedIndex = 'English'
        document.getElementById('english').hidden = false;
        document.getElementById('german').hidden = false;
        document.getElementById('italian').hidden = false;
        document.getElementById('spanish').hidden = false;
        document.getElementById('centerImage').src = randomDrink.strDrinkThumb;
        document.getElementById('cocktailName').textContent = randomDrink.strDrink;
        document.getElementById('instructionsText').textContent = randomDrink.strInstructions;
        filterLanguages(randomDrink);
        const ul = document.getElementById('ingredientsList');
        ul.innerHTML = "";
        addIngredientsList(randomDrink, ul)
    })

    const p = document.createElement('p');
    p.innerHTML = `<b>${randomDrink.strDrink}</b>: ${randomDrink.strCategory}`;
    img.src = randomDrink.strDrinkThumb;
    renderFiveRandom.append(img, p);
}

function filterLanguages(randomDrink) {
    if (randomDrink.strInstructions === null) {
        document.getElementById('english').hidden = true;
    }
    if (randomDrink.strInstructionsDE === null) {
        document.getElementById('german').hidden = true;
    }
    if (randomDrink.strInstructionsIT === null) {
        document.getElementById('italian').hidden = true;
    }
    if (randomDrink.strInstructionsES === null) {
        document.getElementById('spanish').hidden = true;
    }
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
    } else if (e.target.value === "German") {
        instructionsText.textContent = drink.strInstructionsDE;
    } else if (e.target.value === "Italian") {
        instructionsText.textContent = drink.strInstructionsIT;
    } else if (e.target.value === "Spanish") {
        instructionsText.textContent = drink.strInstructionsES;
    }
}


function addIngredientsList(randomDrink, ul) {
    let i = 1;
    const liData = [];
    
    while (randomDrink["strIngredient" + i.toString()] != null) {
        // check if measurement exists, otherwise set to empty string
        const measurement = randomDrink["strMeasure" + i.toString()] != null ? `, ${randomDrink["strMeasure" + i.toString()]}` : "";
        liData.push(randomDrink["strIngredient" + i.toString()] + measurement);
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
        if ( drink.strDrink.toLowerCase() === searchValue.toLowerCase()) {
            document.getElementById('centerImage').src = drink.strDrinkThumb;
            document.getElementById('cocktailName').textContent = drink.strDrink;
            document.getElementById('instructionsText').textContent = drink.strInstructions;
            const ul = document.getElementById('ingredientsList');
            ul.innerHTML = "";
            addIngredientsList(drink, ul)
        }
    })
}
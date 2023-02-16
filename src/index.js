const randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const renderFiveRandom = document.getElementById('renderFiveRandom');
const numRandomCocktails = 4;

// async function handleFetch(){
//     const response = await fetch("some_url")
//     const data = await response.json()
//     console.log(data)
// }

// renders 5 on page load
async function loadFirstCocktail() {
    const response = await fetch(randomCocktailUrl);
    const data = await response.json();
    addRandomDrink(data.drinks[0]);
    setCardElements(data.drinks[0]);
}
loadFirstCocktail();
loadCocktails();

// render 4 random cocktails
function loadCocktails() {
    for (let i = 0; i < numRandomCocktails; i++) {
        renderCocktail();
    }
}

// fetch random cocktail from API
function renderCocktail() {
    return fetch(randomCocktailUrl)
        .then(res => res.json())
        .then(randomDrink => {
            addRandomDrink(randomDrink.drinks[0])
        }) // drinks[0] contains drink object

}

// create random drink and add to div renderFiveRandom
function addRandomDrink(randomDrink) {
    const img = document.createElement('img');
    img.addEventListener('click', () => {
        setCardElements(randomDrink);
    })

    const p = document.createElement('p');
    p.innerHTML = `<b><font size="2.5pt" face="Raleway">${randomDrink.strDrink}</font></b><br> ${randomDrink.strCategory}`;
    img.src = randomDrink.strDrinkThumb;
    renderFiveRandom.append(img, p);
}

// shows available languages for selected drink in dropdown hides unavailable ones
function filterLanguages(randomDrink) {
    randomDrink.strInstructions === null ? document.getElementById('english').hidden = true : false;
    randomDrink.strInstructionsDE === null ? document.getElementById('german').hidden = true : false;
    randomDrink.strInstructionsIT === null ? document.getElementById('italian').hidden = true : false;
    randomDrink.strInstructionsES === null ? document.getElementById('spanish').hidden = true : false;
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

// changes instruction text to specified language
function dropdownLogic(data, instructionsText, e) {
    const drink = data.drinks[0];
    const selectedLanguage = e.target.value;
    return selectedLanguage === "English" ? instructionsText.textContent = drink.strInstructions
        : selectedLanguage === "German" ? instructionsText.textContent = drink.strInstructionsDE
        : selectedLanguage === "Italian" ? instructionsText.textContent = drink.strInstructionsIT
        : selectedLanguage === "Spanish" ? instructionsText.textContent = drink.strInstructionsES
        : null;
}

// add ingredients to center card
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
            setCardElements(drink);
        }
    })
}

function setCardElements(randomDrink) {
    document.getElementById('languageSelect').selectedIndex = 'English'
    document.getElementById('english').hidden = false;
    document.getElementById('german').hidden = false;
    document.getElementById('italian').hidden = false;
    document.getElementById('spanish').hidden = false;
    document.getElementById('centerImage').src = randomDrink.strDrinkThumb;
    document.getElementById('cocktailName').textContent = randomDrink.strDrink;
    document.getElementById('instructionsText').textContent = randomDrink.strInstructions;
    const ul = document.getElementById('ingredientsList');
    ul.innerHTML = "";
    addIngredientsList(randomDrink, ul)
    filterLanguages(randomDrink);
}
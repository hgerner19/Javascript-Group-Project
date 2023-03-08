// ! GLOBAL VARIABLES

const cocktailURL = "https://www.thecocktaildb.com/api/json/v2/9973533/latest.php";
const instructions = document.querySelector("#instructions");
const ingredients = document.querySelector("#ingredients");
const measures = document.querySelector("#Measure");

const fetchAll = () => {
  fetch(`${cocktailURL}`)
    .then((response) => response.json())
    .then((cocktails) => {
      const cocktails1 = cocktails.drinks;
      cocktails1.forEach((cocktail) => {
          console.log(cocktail)
          let newArr =  Object.keys(cocktail)
          .filter((k) => cocktail[k] != null)
          .reduce((a, k) => ({ ...a, [k]: cocktail[k] }), {});
          console.log(newArr)
          renderCocktails(newArr);
      });
    });
};

const renderCocktails = (cocktail) => {
    const cocktailMenu = document.querySelector("#cocktail-bar");
    const span = document.createElement("span");
    span.innerText = cocktail.strDrink;
    span.addEventListener("click", (e) => {
        console.log("event");
        renderDetails(cocktail);
        dropDown(cocktail);
        // Resetting ingredients and instructions after different
        // drink is clicked
        ingredients.textContent = null;
        instructions.textContent = null;
        measures.textContent = null;
        e.target.reset();
    });
    cocktailMenu.appendChild(span);
};

const renderDetails = (cocktail) => {
    const image = document.querySelector("#image");
    const name = document.querySelector("#name");

    image.src = cocktail.strImageSource;
    image.alt = cocktail.strDrink;
    name.textContent = cocktail.strDrink;
}

function dropDown(cocktail) {
    document.getElementById("button").addEventListener("click",(e) =>{
        document.getElementById("myDropdown").classList.toggle("show")
    })
    document.getElementById("one").addEventListener("click", (e) => {
        e.preventDefault();
        renderIngredients(cocktail)
    })

    document.getElementById("two").addEventListener("click", (e) => {
        e.preventDefault();
        renderInstructions(cocktail);
        e.target.reset();
    })

    document.getElementById("three").addEventListener("click", (e) => {
        e.preventDefault();
        renderMeasures(cocktail);
    })
}

const renderInstructions = (cocktail) => {
    instructions.textContent = cocktail.strInstructions;
}

const renderIngredients = (cocktail) => {
    let ing = Object.entries(cocktail)
        .filter(([j]) => j.startsWith("strIngredient"))
        .map(([,k]) => k);
    ingredients.textContent = null;
    ing.forEach((item) => {
        const li = document.createElement("p")
        li.textContent = item
        ingredients.append(li)
    })
}

const renderMeasures = (cocktail) => {
    let measure = Object.entries(cocktail)
    .filter(([j]) => j.startsWith("strMeasure"))
    .map(([,k]) => k);
    for(i = 0; i< measure.length; i++){
        if(measure[i] === null){
            measure.pop()
        }
    }
    measures.textContent = null;
    measure.forEach((item) => {
        const li = document.createElement("p")
        li.textContent = item
        measures.append(li)
    })
}
const init = () => {
    fetchAll()
}
init();


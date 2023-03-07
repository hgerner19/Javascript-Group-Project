const cocktailURL = "https://www.thecocktaildb.com/api/json/v2/9973533/latest.php";
const fetchAll = () => {
  fetch(`${cocktailURL}`)
    .then((response) => response.json())
    .then((cocktails) => {
      console.log(cocktails.drinks);
      const cocktails1 = cocktails.drinks;
      cocktails1.forEach((cocktail) => {
          console.log(cocktail)
          renderCocktails(cocktail);
      });
    });
};

const renderCocktails = (cocktail) => {
    const cocktailMenu = document.querySelector("#cocktail-bar");
    const span = document.createElement("span");
    span.innerText = cocktail.strDrink;
    cocktailMenu.appendChild(span);
 
};

function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}
const init = () => {
    fetchAll()
}
init();
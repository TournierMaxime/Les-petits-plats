class App {
  constructor(recipes) {
    this.recipes = recipes
    this.recipesCards = document.querySelector(".recipesCards")
  }

  displayRecipe(recipes) {
    this.recipesCards.innerHTML = ""

    for (let recipe of recipes) {
      const creaData = new Recipe(
        recipe.id,
        recipe.name,
        recipe.servings,
        recipe.ingredients,
        recipe.time,
        recipe.description,
        recipe.appliance,
        recipe.ustensils
      )
      const creaCarte = creaData.createCardRecipe()
      this.recipesCards.appendChild(creaCarte)
    }
  }

  noResultsFound() {
    this.recipesCards.innerHTML = ""

    const noResults = document.createElement("div")
    noResults.id = "noResultsFound"
    noResults.textContent =
      'Aucune recette ne correspond à vos critères, veuillez modifier votre recherche svp. Vous pouvez chercher "tarte aux pommes", "poisson", etc...'
    this.recipesCards.appendChild(noResults)
  }
}

const app = new App(recipes)
app.displayRecipe(recipes)

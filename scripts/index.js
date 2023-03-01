class App {
  constructor(recipes) {
    this.recipes = recipes
    this.recipesCards = document.querySelector(".recipesCards")
  }

  displayRecipe(recipes) {
    this.recipesCards.innerHTML = ""

    recipes.map((recipe) => {
      this.createRecipe = new Recipe(
        recipe.id,
        recipe.name,
        recipe.servings,
        recipe.ingredients,
        recipe.time,
        recipe.description,
        recipe.appliance,
        recipe.ustensils
      )
      this.createCard = this.createRecipe.createCardRecipe()
      this.recipesCards.appendChild(this.createCard)
    })
  }

  noResultsFound() {
    this.recipesCards.innerHTML = ""

    this.noResults = document.createElement("div")
    this.noResults.id = "noResultsFound"
    this.noResults.textContent =
      'Aucune recette ne correspond à vos critères, veuillez modifier votre recherche svp. Vous pouvez chercher "tarte aux pommes", "poisson", etc...'
    this.recipesCards.appendChild(this.noResults)
  }
}

const app = new App(recipes)
app.displayRecipe(recipes)

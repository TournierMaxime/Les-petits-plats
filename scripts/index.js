class App {
  constructor(recipes) {
    this.recipes = recipes
    this.recipesCards = document.querySelector(".recipesCards")
    /*     this.tabIngredients = []
    this.tabUstensiles = []
    this.tabAppliance = [] */
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

  /*   displayList(recipe) {
    this.filterList(recipe)
    this.tagList(this.tabIngredients, "ingredients")
    this.tagList(this.tabAppliance, "devices")
    this.tagList(this.tabUstensiles, "utensils") 
  } */

  /*   filterList(recipe) {
    recipe.forEach(({ ingredients, ustensils, appliance }) => {
      ingredients.forEach(({ ingredient }) => {
        if (!this.tabIngredients.includes(ingredient)) {
          this.tabIngredients.push(ingredient)
        }
      })
      ustensils.forEach((ustensil) => {
        if (!this.tabUstensiles.includes(ustensil)) {
          this.tabUstensiles.push(ustensil)
        }
      })
      if (!this.tabAppliance.includes(appliance)) {
        this.tabAppliance.push(appliance)
      }
    })
  } */

  /*   tagList(tab, type) {
    const list = document.getElementById(type + "_div")
    list.innerHTML = ""

    const ul = document.createElement("ul")
    ul.type = type

    list.appendChild(ul)

    tab.forEach((item) => {
      const li = document.createElement("li")
      li.className = "li_" + type
      li.innerHTML = item
      ul.appendChild(li)
    })
  } */
}

const app = new App(recipes)
app.displayRecipe(recipes)

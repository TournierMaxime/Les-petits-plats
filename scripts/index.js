class App {
  constructor(recipes) {
    this.recipes = recipes
    this.cartesRecettes = document.querySelector(".recipesCards")
    this.tabIngredients = []
    this.tabUstensiles = []
    this.tabAppareils = []
  }

  displayRecette(recipes) {
    this.cartesRecettes.innerHTML = ""

    recipes.forEach(({ ...recette }) => {
      const creaData = new Recipe(
        recette.id,
        recette.name,
        recette.servings,
        recette.ingredients,
        recette.time,
        recette.description,
        recette.appliance,
        recette.ustensils
      )
      const creaCarte = creaData.createCardRecipe()
      this.cartesRecettes.appendChild(creaCarte)
    })
  }

  noResultsFound() {
    this.cartesRecettes.innerHTML = ""

    const divnull = document.createElement("div")
    divnull.id = "pas_de_recette"
    divnull.textContent =
      'Aucune recette ne correspond à vos critères, veuillez modifier votre recherche svp. Vous pouvez chercher "tarte aux pommes", "poisson", etc...'
    this.cartesRecettes.appendChild(divnull)
  }

  displayList(recipe) {
    this.creaListeFiltre(recipe)
    this.creaListeDom(this.tabIngredients, "ingredients")
    this.creaListeDom(this.tabAppareils, "devices")
    this.creaListeDom(this.tabUstensiles, "utensils")
  }

  creaListeFiltre(recipe) {
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
      if (!this.tabAppareils.includes(appliance)) {
        this.tabAppareils.push(appliance)
      }
    })
  }

  creaListeDom(tab, type) {
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
  }
}

const app = new App(recipes)
app.displayRecette(recipes)

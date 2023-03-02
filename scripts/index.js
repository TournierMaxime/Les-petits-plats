import { searchEngineTag } from "./searchTag.js"
import recipes from "../data/recipes.js"
import Recipe from "./recipes.js"

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

  displayList(recipes) {
    searchEngineTag.generateDistinctTagsArrays(recipes)
    searchEngineTag.createTagList(searchEngineTag.tabIngredients, "ingredients")
    searchEngineTag.createTagList(searchEngineTag.tabDevices, "devices")
    searchEngineTag.createTagList(searchEngineTag.tabUtensils, "utensils")
  }

  //Renseigne la fonction filtreBtn pour les paramètres
  displayFilterBtn() {
    searchEngineTag.filterRecipesByTags(
      searchEngineTag.tabIngredients,
      "ingredients"
    )
    searchEngineTag.filterRecipesByTags(searchEngineTag.tabDevices, "devices")
    searchEngineTag.filterRecipesByTags(searchEngineTag.tabUtensils, "utensils")
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

export const app = new App(recipes)
app.displayRecipe(recipes)
app.displayList(recipes)
app.displayFilterBtn()

const openBtnIngredient = document.getElementById("ingredients-down")
const openBtnAppareil = document.getElementById("devices-down")
const openBtnUstensile = document.getElementById("utensils-down")

const btnIngredient = document.querySelector(".btn_ingredients")
const btnAppareil = document.querySelector(".btn_devices")
const btnUstensile = document.querySelector(".btn_utensils")

const ListeIngredients = document.querySelector(".list_ingredients")
const ListeAppareils = document.querySelector(".list_devices")
const ListeUstensiles = document.querySelector(".list_utensils")

const closeIngredient = document.getElementById("ingredients-up")
const closeAppareil = document.getElementById("devices-up")
const closeUstensile = document.getElementById("utensils-up")

searchEngineTag.divListeIng = document.getElementById("ingredients_div")
searchEngineTag.divListeApp = document.getElementById("devices_div")
searchEngineTag.divListeUst = document.getElementById("utensils_div")

openBtnIngredient.addEventListener("click", () => {
  searchEngineTag.openIngredientsList(
    openBtnIngredient,
    ListeIngredients,
    ListeAppareils,
    ListeUstensiles,
    openBtnAppareil,
    openBtnUstensile,
    btnAppareil,
    btnUstensile
  )
})

openBtnAppareil.addEventListener("click", () => {
  searchEngineTag.openDevicesList(
    openBtnAppareil,
    ListeAppareils,
    ListeIngredients,
    ListeUstensiles,
    openBtnIngredient,
    openBtnUstensile,
    btnUstensile,
    btnAppareil
  )
})

openBtnUstensile.addEventListener("click", () => {
  searchEngineTag.openUtensilsList(
    openBtnUstensile,
    ListeUstensiles,
    ListeIngredients,
    ListeAppareils,
    openBtnIngredient,
    openBtnAppareil,
    btnAppareil
  )
})

closeIngredient.addEventListener("click", () => {
  searchEngineTag.closeIngredientsList(
    openBtnIngredient,
    ListeIngredients,
    btnAppareil,
    btnUstensile
  )
})

closeAppareil.addEventListener("click", () => {
  searchEngineTag.closeDevicesList(
    openBtnAppareil,
    ListeAppareils,
    btnUstensile
  )
})

closeUstensile.addEventListener("click", () => {
  searchEngineTag.closeUtensilsList(
    openBtnUstensile,
    ListeUstensiles,
    btnUstensile
  )
})

// Evenement au click sur un mot de la liste
searchEngineTag.divListeIng.addEventListener("click", (e) => {
  if (
    searchEngineTag.tabIngredients.includes(e.target.textContent.toLowerCase())
  ) {
    searchEngineTag.createTagElement(e, "ingredients")
    searchEngineTag.filterRecipesBySelectedTags()
  } else {
    searchEngineTag.createTagElement(e, "ingredients")
    searchEngineTag.filterRecipesBySelectedTags()
  }
})

searchEngineTag.divListeUst.addEventListener("click", (e) => {
  if (
    searchEngineTag.tabUtensils.includes(e.target.textContent.toLowerCase())
  ) {
    searchEngineTag.createTagElement(e, "utensils")
    searchEngineTag.filterRecipesBySelectedTags()
  } else {
    searchEngineTag.createTagElement(e, "utensils")
    searchEngineTag.filterRecipesBySelectedTags()
  }
})

searchEngineTag.divListeApp.addEventListener("click", (e) => {
  if (searchEngineTag.tabDevices.includes(e.target.textContent.toLowerCase())) {
    searchEngineTag.createTagElement(e, "devices")
    searchEngineTag.filterRecipesBySelectedTags()
  } else {
    searchEngineTag.createTagElement(e, "devices")
    searchEngineTag.filterRecipesBySelectedTags()
  }
})

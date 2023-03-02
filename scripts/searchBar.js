import recipes from "../data/recipes.js"
import { app } from "./index.js"
import { searchEngineTag } from "./searchTag.js"
class SearchEngine {
  constructor(recipes) {
    this.recipes = recipes
    this.query = document.getElementById("searchBar")
  }

  // Méthode auxiliaire pour vérifier si une chaîne de caractères inclut une sous-chaîne donnée, sans tenir compte de la casse
  includesIgnoreCase = (str, subStr) => {
    return str.toLowerCase().includes(subStr.toLowerCase())
  }

  // Méthode pour effectuer une recherche sur les recettes
  search = () => {
    // Chercher les recettes qui correspondent à la requête
    this.inputValue = this.query.value
    this.matches = []

    // Convertir la requête en minuscules
    this.inputValue = this.inputValue.toLowerCase()

    // Vérifier que la requête est suffisamment longue
    if (this.inputValue.length < 3) {
      return []
    }

    // Afficher un message d'erreur si aucun résultat n'est trouvé
    if (this.matches.length === 0) {
      app.noResultsFound()
    }

    if (this.inputValue.length >= 3) {
      recipes.map((recipe) => {
        // Vérifier si le nom de la recette inclut la requête
        if (this.includesIgnoreCase(recipe.name, this.inputValue)) {
          this.matches.push(recipe)
        } else {
          // Vérifier si un ingrédient de la recette inclut la requête
          recipe.ingredients.map((ingredient) => {
            if (
              this.includesIgnoreCase(ingredient.ingredient, this.inputValue)
            ) {
              this.matches.push(recipe)
              return
            }
          })
        }

        // Vérifier si l'appareil de la recette inclut la requête
        if (this.includesIgnoreCase(recipe.description, this.inputValue)) {
          this.matches.push(recipe)
        }
      })
    } else {
      searchEngineTag.filterRecipesBySelectedTags()
      this.matches = recipes
    }

    // Afficher un message d'erreur si aucun résultat n'est trouvé
    if (this.matches.length === 0) {
      app.noResultsFound()
    } else {
      // Filtre les doublons d'un tableau pour en retourner un nouveau contenant uniquement les éléments uniques
      this.uniqueMatches = [...new Set(this.matches)]
      app.displayRecipe(this.uniqueMatches)
      app.displayList(this.uniqueMatches)

      return this.uniqueMatches
    }
  }
}

export const searchEngine = new SearchEngine(recipes)

const searchBar = document.getElementById("searchBar")

searchBar.addEventListener("input", () => {
  // SUpprime les espaces blancs inutile
  const query = searchBar.value.trim()
  if (query.length < 3) {
    // Restaurer le contenu initial si la requête est trop courte
    app.displayRecipe(recipes)
  } else {
    const result = searchEngine.search()
    if (result && result.length === 0) {
      app.noResultsFound()
    }
  }
})

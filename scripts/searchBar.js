class SearchEngine {
  constructor(recipes) {
    this.recipes = recipes
  }

  // Méthode auxiliaire pour vérifier si une chaîne de caractères inclut une sous-chaîne donnée, sans tenir compte de la casse
  includesIgnoreCase = (str, subStr) => {
    return str.toLowerCase().includes(subStr.toLowerCase())
  }

  // Méthode pour effectuer une recherche sur les recettes
  search = (query) => {
    // Chercher les recettes qui correspondent à la requête
    const matches = []

    // Convertir la requête en minuscules
    query = query.toLowerCase()

    // Vérifier que la requête est suffisamment longue
    if (query.length < 3) {
      return []
    }

    // Afficher un message d'erreur si aucun résultat n'est trouvé
    if (matches.length === 0) {
      app.noResultsFound()
    }

    recipes.map((recipe) => {
      // Vérifier si le nom de la recette inclut la requête
      if (this.includesIgnoreCase(recipe.name, query)) {
        matches.push(recipe)
      } else {
        // Vérifier si un ingrédient de la recette inclut la requête
        recipe.ingredients.map((ingredient) => {
          if (this.includesIgnoreCase(ingredient.ingredient, query)) {
            matches.push(recipe)
            return
          }
        })
      }

      // Vérifier si l'appareil de la recette inclut la requête
      if (this.includesIgnoreCase(recipe.description, query)) {
        matches.push(recipe)
      }
    })

    // Afficher un message d'erreur si aucun résultat n'est trouvé
    if (matches.length === 0) {
      app.noResultsFound()
    } else {
      // Filtre les doublons d'un tableau pour en retourner un nouveau contenant uniquement les éléments uniques
      const uniqueMatches = [...new Set(matches)]
      app.displayRecipe(uniqueMatches)
      // app.displayList(uniqueMatches)

      return uniqueMatches
    }
  }
}

const searchEngine = new SearchEngine(recipes)

const searchBar = document.getElementById("searchBar")

searchBar.addEventListener("input", () => {
  // SUpprime les espaces blancs inutile
  const query = searchBar.value.trim()
  if (query.length < 3) {
    // Restaurer le contenu initial si la requête est trop courte
    app.displayRecipe(recipes)
  } else {
    const result = searchEngine.search(query)
    if (result && result.length === 0) {
      app.noResultsFound()
    }
  }
})

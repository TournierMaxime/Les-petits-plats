const searchBar = document.getElementById("searchBar")
// Méthode auxiliaire pour vérifier si une chaîne de caractères inclut une sous-chaîne donnée, sans tenir compte de la casse
const includesIgnoreCase = (str, subStr) => {
  return str.toLowerCase().includes(subStr.toLowerCase())
}

// Méthode pour effectuer une recherche sur les recettes
const search = (query) => {
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
    noResultsFound()
  }

  for (const recipe of recipes) {
    // Vérifier si le nom de la recette inclut la requête
    if (includesIgnoreCase(recipe.name, query)) {
      matches.push(recipe)
    } else {
      // Vérifier si un ingrédient de la recette inclut la requête
      for (const ingredient of recipe.ingredients) {
        if (includesIgnoreCase(ingredient.ingredient, query)) {
          matches.push(recipe)
          break
        }
      }
    }

    // Vérifier si un ustensile de la recette inclut la requête
    for (const ustensil of recipe.ustensils) {
      if (includesIgnoreCase(ustensil, query)) {
        matches.push(recipe)
        break
      }
    }

    // Vérifier si l'appareil de la recette inclut la requête
    if (includesIgnoreCase(recipe.appliance, query)) {
      matches.push(recipe)
    }
  }

  // Afficher un message d'erreur si aucun résultat n'est trouvé
  if (matches.length === 0) {
    noResultsFound()
  } else {
    const uniqueMatches = [...new Set(matches)]
    displayRecette(uniqueMatches)
    displayList(uniqueMatches)

    // Retourner les recettes correspondant à la requête, sans doublons
    return uniqueMatches
  }
}

searchBar.addEventListener("input", () => {
  const query = searchBar.value.trim()
  if (query.length < 3) {
    // Restaurer le contenu initial si la requête est trop courte
    displayRecette(recipes)
  } else {
    const result = search(query)
    if (result && result.length === 0) {
      noResultsFound()
    }
  }
})

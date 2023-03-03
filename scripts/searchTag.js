import { app } from "./index.js"
import recipes from "../data/recipes.js"
import { searchEngine } from "./searchBar.js"

class SearchEngineTag {
  constructor(recipes) {
    this.recipes = recipes
    // initialise pour stocker les recettes filtrées
    this.filteredRecipes = recipes
    this.lastSearchResult = []

    // stock les tags par tableaux
    this.tabIngredients = []
    this.tabUtensils = []
    this.tabDevices = []

    // Interaction avec le DOM
    this.divListeIng = document.getElementById("ingredients_div")
    this.divListeApp = document.getElementById("devices_div")
    this.divListeUst = document.getElementById("utensils_div")
    this.ulTag = document.getElementById("tag")
  }

  generateDistinctTagsArrays(recipes) {
    this.tabIngredients = []
    this.tabUtensils = []
    this.tabDevices = []

    // On parcours le tableau des recettes et on pousse chaque recette dans son tableau correspondant
    recipes.forEach((recipe) => {
      recipe.ingredients.map((ingredient) => {
        this.tabIngredients.push(
          this.capitalizeFirstLetter(ingredient.ingredient)
        )
      })
      recipe.ustensils.map((ustensile) => {
        this.tabUtensils.push(this.capitalizeFirstLetter(ustensile))
      })
      this.tabDevices.push(this.capitalizeFirstLetter(recipe.appliance))
    })

    // On supprime les doublons puis on trie par ordre alphabétique
    this.tabIngredients = [...new Set(this.tabIngredients)].sort()
    this.tabUtensils = [...new Set(this.tabUtensils)].sort()
    this.tabDevices = [...new Set(this.tabDevices)].sort()
  }

  createTagList(arrayTag, id) {
    // On creer les listes par tags
    this.divList = document.getElementById(id + "_div")
    this.divList.innerHTML = ""

    this.ul = document.createElement("ul")
    this.ul.id = id

    this.divList.appendChild(this.ul)

    arrayTag.forEach((e) => {
      this.li = document.createElement("li")
      this.li.className = "li_" + id
      this.li.innerHTML = e
      this.ul.appendChild(this.li)
    })
  }

  // Gère le filtrage des recettes en fonction des tags sélectionnés

  filterRecipesByTags(arrayTag, id) {
    //On récupère la valeur de l'input de recherche associé
    this.inputBtn = document.getElementById("input_" + id)
    this.searchBar = this.inputBtn.value
    this.suggestion = ""
    //On Filtre les tags en fonction de cette valeur
    // Seuls les tags contenant la chaîne de caractères saisie sont affichés
    if (this.searchBar.length >= 3) {
      let result = arrayTag.filter((el) =>
        el.toLowerCase().includes(this.searchBar.toLowerCase())
      )

      result.forEach(
        (el) =>
          (this.suggestion += `
            <li class = li_choix_${id}, value = "${el}">${el}</li>`)
      )

      document.getElementById(id).innerHTML = this.suggestion
    } else {
      //Sinon la valeur a moins de 3 caractères, la liste complète des tags est affichée
      this.createTagList(arrayTag, id)
    }
    // La méthode app.displayFilterBtn est appelée à chaque saisie pour mettre à jour les résultats affichés
    this.inputBtn.addEventListener("input", app.displayFilterBtn)
  }

  //Cette méthode est appelée lorsqu'un tag est sélectionné
  createTagElement(e, id) {
    this.liTag = document.createElement("li")
    this.liTag.className = "li_" + id
    this.liTag.id = "li_" + e.target.textContent

    this.spanTag = document.createElement("span")
    this.spanTag.className = "span_" + id

    this.iTag = document.createElement("i")
    this.iTag.className = "far fa-times-circle"
    this.iTag.id = "close_" + e.target.textContent
    this.iTag.onclick = this.closeTag.bind(this)

    this.spanTag.innerHTML = e.target.textContent

    this.liTag.appendChild(this.spanTag)
    this.liTag.appendChild(this.iTag)
    this.ulTag.appendChild(this.liTag)
  }

  // Cette méthode est appelée lorsqu'un tag est supprimé
  // Elle met également à jour les tableaux de tags sélectionnés et filtre les recettes en conséquence
  closeTag(e) {
    // Supprimer le tag
    this.ulTag.removeChild(e.target.parentNode)

    // Mettre à jour les tableaux de tags
    this.tabIngredients = Array.from(
      this.ulTag.querySelectorAll(".span_ingredients")
    ).map((e) => e.textContent.toLowerCase())

    this.tabDevices = Array.from(
      this.ulTag.querySelectorAll(".span_devices")
    ).map((e) => e.textContent.toLowerCase())

    this.tabUtensils = Array.from(
      this.ulTag.querySelectorAll(".span_utensils")
    ).map((e) => e.textContent.toLowerCase())

    // Exécuter une nouvelle recherche en tenant compte des tags restants
    if (
      this.tabIngredients.length > 0 ||
      this.tabDevices.length > 0 ||
      this.tabUtensils.length > 0
    ) {
      // S'il y a des tags, filtrer les recettes correspondantes
      let filteredRecipes = this.lastSearchResult.filter((recipe) => {
        return (
          this.tabDevices.every((app) =>
            recipe.appliance.toLowerCase().includes(app)
          ) &&
          this.tabUtensils.every((ust) =>
            recipe.ustensils.some((ustensile) =>
              ustensile.toLowerCase().includes(ust)
            )
          ) &&
          this.tabIngredients.every((ing) =>
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(ing)
            )
          )
        )
      })

      // Afficher les résultats de la recherche filtrée
      app.displayRecipe(filteredRecipes)
      app.displayList(filteredRecipes)
    } else {
      // S'il n'y a plus de tags, réexécuter la dernière recherche générale
      searchEngine.search()
    }
    // Mettre à jour la liste des résultats de la recherche en fonction des tags restants
    //
  }

  // Cette méthode filtre les recettes en fonction des tags sélectionnés
  filterRecipesBySelectedTags() {
    this.tabIngredients = []
    this.tabUtensils = []
    this.tabDevices = []

    // On parcourt la liste des tags sélectionnés dans le DOM pour remplir les tableaux de tags

    Array.from(this.ulTag.children).forEach((e) => {
      if (e.children[0].className == "span_utensils") {
        this.tabUtensils.push(e.children[0].textContent.toLowerCase())
      }

      if (e.children[0].className == "span_devices") {
        this.tabDevices.push(e.children[0].textContent.toLowerCase())
      }

      if (e.children[0].className == "span_ingredients") {
        this.tabIngredients.push(e.children[0].textContent.toLowerCase())
      }
    })

    // every : teste si tous les element d'un tableau verifient une condition, renvoie true
    // some : teste si au moins un element du tableau passe le test, renvoie booleen

    // On utilise ensuite ces tableaux pour filtrer les recettes en fonction des tags sélectionnés

    if (this.ulTag.childElementCount > 0) {
      // On filtre les tableaux
      let resultTag = this.recipes.filter((recipe) => {
        // On teste si les éléments des tableaux sont inclus dans les recettes
        return (
          this.tabDevices.every((app) =>
            recipe.appliance.toLowerCase().includes(app)
          ) &&
          this.tabUtensils.every((ust) =>
            recipe.ustensils.some((ustensile) =>
              ustensile.toLowerCase().includes(ust)
            )
          ) &&
          this.tabIngredients.every((ing) =>
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(ing)
            )
          )
        )
      })

      // Les recettes filtrées sont stockées dans filteredRecipes

      this.lastSearchResult = resultTag
    } else {
      this.lastSearchResult = this.recipes
    }
    app.displayRecipe(this.lastSearchResult)
    app.displayList(this.lastSearchResult)
  }

  openIngredientsList(
    openBtnIngredient,
    ListeIngredients,
    ListeAppareils,
    ListeUstensiles,
    openBtnAppareil,
    openBtnUstensile,
    btnAppareil,
    btnUstensile
  ) {
    openBtnIngredient.style.display = "none"
    ListeIngredients.style.display = "block"
    ListeAppareils.style.display = "none"
    ListeUstensiles.style.display = "none"
    openBtnAppareil.style.display = "block"
    openBtnUstensile.style.display = "block"
    btnAppareil.style.transform = "translateX(350px)"
    btnUstensile.style.transform = "translateX(300px)"
  }

  openDevicesList(
    openBtnAppareil,
    ListeAppareils,
    ListeIngredients,
    ListeUstensiles,
    openBtnIngredient,
    openBtnUstensile,
    btnUstensile,
    btnAppareil
  ) {
    openBtnAppareil.style.display = "none"
    ListeAppareils.style.display = "block"
    ListeIngredients.style.display = "none"
    ListeUstensiles.style.display = "none"
    openBtnIngredient.style.display = "block"
    openBtnUstensile.style.display = "block"
    btnUstensile.style.transform = "translateX(370px)"
    btnAppareil.style.transform = "translateX(0px)"
  }

  openUtensilsList(
    openBtnUstensile,
    ListeUstensiles,
    ListeIngredients,
    ListeAppareils,
    openBtnIngredient,
    openBtnAppareil,
    btnAppareil
  ) {
    openBtnUstensile.style.display = "none"
    ListeUstensiles.style.display = "block"
    ListeIngredients.style.display = "none"
    ListeAppareils.style.display = "none"
    openBtnIngredient.style.display = "block"
    openBtnAppareil.style.display = "block"
    btnAppareil.style.transform = "translateX(-10px)"
  }

  closeIngredientsList(
    openBtnIngredient,
    ListeIngredients,
    btnAppareil,
    btnUstensile
  ) {
    openBtnIngredient.style.display = "block"
    ListeIngredients.style.display = "none"
    btnAppareil.style.transform = "translateX(0)"
    btnUstensile.style.transform = "translateX(0)"
  }

  closeDevicesList(openBtnAppareil, ListeAppareils, btnUstensile) {
    openBtnAppareil.style.display = "block"
    ListeAppareils.style.display = "none"
    btnUstensile.style.transform = "translateX(0)"
  }

  closeUtensilsList(openBtnUstensile, ListeUstensiles, btnUstensile) {
    openBtnUstensile.style.display = "block"
    ListeUstensiles.style.display = "none"
    btnUstensile.style.transform = "translateX(0)"
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}

export const searchEngineTag = new SearchEngineTag(recipes)

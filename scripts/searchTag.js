import { app } from "./index.js"
import recipes from "../data/recipes.js"
import { searchEngine } from "./searchBar.js"

class SearchEngineTag {
  constructor(recipes) {
    this.recipes = recipes
    this.filteredRecipes = recipes

    this.divListeIng = document.getElementById("ingredients_div")
    this.divListeApp = document.getElementById("devices_div")
    this.divListeUst = document.getElementById("utensils_div")

    this.ulTag = document.getElementById("tag")

    this.tabIngredients = []
    this.tabUtensils = []
    this.tabDevices = []
  }

  //          CREATION DES TABLEAUX BOUTONS FILTRE

  creaListeFiltre(recipes) {
    this.tabIngredients = []
    this.tabUtensils = []
    this.tabDevices = []

    recipes.forEach((recipe) => {
      //Je fais mon tableau
      recipe.ingredients.map((ingredient) => {
        this.tabIngredients.push(ingredient.ingredient)
      })
      recipe.ustensils.map((ustensile) => {
        this.tabUtensils.push(ustensile)
      })
      this.tabDevices.push(recipe.appliance)
    })

    //Je trie pour supp les doublons
    this.tabIngredients = [...new Set(this.tabIngredients)].sort()
    this.tabUtensils = [...new Set(this.tabUtensils)].sort()
    this.tabDevices = [...new Set(this.tabDevices)].sort()
  }

  //          CREATION DES LISTES BOUTONS FILTRE

  createList(tabTag, id) {
    //........je crée un UL et des LI generique.............
    this.divList = document.getElementById(id + "_div")
    this.divList.innerHTML = ""

    this.ul = document.createElement("ul")
    this.ul.id = id

    this.divList.appendChild(this.ul)

    tabTag.forEach((e) => {
      this.li = document.createElement("li")
      this.li.className = "li_" + id
      this.li.innerHTML = e
      this.ul.appendChild(this.li)
    })
  }

  //              RECHERCHE AVEC BOUTON FILTRE

  filterBtn(tabTag, id) {
    this.inputBtn = document.getElementById("input_" + id)

    this.searchBar = this.inputBtn.value

    //Je filtre en fonction des 3 caractères saisis
    if (this.searchBar.length >= 3) {
      let result = tabTag.filter((el) =>
        el.toLowerCase().includes(this.searchBar.toLowerCase())
      )

      this.suggestion = ""
      //Je parcour le tableau de resultat et j'affiche les suggestions
      result.forEach(
        (el) =>
          (this.suggestion += `
            <li class = li_choix_${id}, value = "${el}">${el}</li>`)
      )

      document.getElementById(id).innerHTML = this.suggestion
    } else {
      this.createList(tabTag, id)
    }
    this.inputBtn.addEventListener("input", app.displayFilterBtn)
  }

  //      APPARITION DES TAGS SELECTIONNES
  // construction de la zone tag selectionne

  //............ESSAI DE REFACTORISATION .............

  //Création des balises du Dom pour les tags
  creaTagDom(e, id) {
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
  //**************************************************************************************** */

  //fonction de suppression du tag avec la croix

  closeTag(e) {
    this.ulTag.removeChild(e.target.parentNode)

    this.tabIngredients.splice(e)

    this.tabDevices.splice(e)

    this.tabUtensils.splice(e)

    this.filteredRecipes = this.recipes

    this.filtreTag()
    searchEngine.search()

    app.displayRecipe(this.filteredRecipes)
    app.displayList(this.filteredRecipes)
  }

  //*************************************************************************************** */

  //Filtre entre les tags et les recettes

  //création de tableau vide des tags

  filtreTag() {
    this.tabIngredients = []
    this.tabUtensils = []
    this.tabDevices = []
    //remise à zéro des tableau des tags

    //récupère le li qui est contenu dans ultag(element enfant)
    Array.from(this.ulTag.children).forEach((e) => {
      if (e.children[0].className == "span_utensils") {
        //si l'element enfant à la class span_ustensiles
        this.tabUtensils.push(e.children[0].textContent.toLowerCase())
        //je le mets dans le tableau des ustensiles
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

    if (this.ulTag.childElementCount > 0) {
      //si ultag contient quelque chose
      let resultTag = this.recipes.filter((recipe) => {
        //je parcours les recettes
        return (
          //et je retourne, la comparaison entre les tableaux et les recettes
          //test si tous les éléments contenus dans tab...sont inclus dans au moins une recette
          this.tabDevices.every((app) =>
            recipe.appliance.toLowerCase().includes(app)
          ) &&
          //test sur tous les elements du tableau crée et parcours du tableau initial pour verifier au moins un element
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

      this.filteredRecipes = resultTag
    } else {
      this.filteredRecipes = this.recipes
    }
    app.displayRecipe(this.filteredRecipes)
    app.displayList(this.filteredRecipes)
  }

  //....................OUVERTURE DES LISTES

  openListeIngredients(
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

  openListeAppareils(
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

  openListeUstensiles(
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

  //................FERMETURE DES LISTES

  closeListeIngredients(
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

  closeListeAppareils(openBtnAppareil, ListeAppareils, btnUstensile) {
    openBtnAppareil.style.display = "block"
    ListeAppareils.style.display = "none"
    btnUstensile.style.transform = "translateX(0)"
  }

  closeListeUstensiles(openBtnUstensile, ListeUstensiles, btnUstensile) {
    openBtnUstensile.style.display = "block"
    ListeUstensiles.style.display = "none"
    btnUstensile.style.transform = "translateX(0)"
  }
}

export const searchEngineTag = new SearchEngineTag(recipes)

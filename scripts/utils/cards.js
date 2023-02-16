let tabIngredients
let tabUstensiles
let tabAppareils

function creaListeFiltre(recettesParam) {
  tabIngredients = []
  tabUstensiles = []
  tabAppareils = []

  recettesParam.forEach((recette) => {
    //Je fais mon tableau
    recette.ingredients.map((ingredient) => {
      tabIngredients.push(ingredient.ingredient)
    })
    recette.ustensils.map((ustensile) => {
      tabUstensiles.push(ustensile)
    })
    tabAppareils.push(recette.appliance)
  })

  //Je trie pour supp les doublons
  tabIngredients = [...new Set(tabIngredients)].sort()
  tabUstensiles = [...new Set(tabUstensiles)].sort()
  tabAppareils = [...new Set(tabAppareils)].sort()
}

function creaListeDom(tabTag, id) {
  //........je crée un UL et des LI generique.............
  const divListe = document.getElementById(id + "_div")
  divListe.innerHTML = ""

  const ul = document.createElement("ul")
  ul.id = id

  divListe.appendChild(ul)

  tabTag.forEach((e) => {
    const li = document.createElement("li")
    li.className = "li_" + id
    li.innerHTML = e
    ul.appendChild(li)
  })
}

const divListeIng = document.getElementById("ingredients_div")
const divListeApp = document.getElementById("devices_div")
const divListeUst = document.getElementById("utensils_div")

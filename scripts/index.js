//Renseigne la fonction creaListeDom pour les paramètres
function displayList(recipe) {
  creaListeFiltre(recipe)
  creaListeDom(tabIngredients, "ingredients")
  creaListeDom(tabAppareils, "devices")
  creaListeDom(tabUstensiles, "utensils")
}

const cartesRecettes = document.querySelector(".recipesCards")

//Message en cas de recette non trouvée
function noResultsFound() {
  cartesRecettes.innerHTML = ""

  const divnull = document.createElement("div")
  divnull.id = "pas_de_recette"
  divnull.textContent =
    'Aucune recette ne correspond à vos critères, veuillez modifier votre recherche svp. Vous pouvez chercher "tarte aux pommes", "poisson", etc...'
  cartesRecettes.appendChild(divnull)
}

function displayRecette(recipes) {
  cartesRecettes.innerHTML = ""

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
    cartesRecettes.appendChild(creaCarte)
  })
}

function init() {
  displayRecette(recipes)
  displayList(recipes)
}

init()

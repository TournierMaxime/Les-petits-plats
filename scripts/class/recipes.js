class Recipe {
  constructor(
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils
  ) {
    this.id = id
    this.name = name
    this.servings = servings
    this.ingredients = ingredients
    this.time = time
    this.description = description
    this.appliance = appliance
    this.ustensils = ustensils
  }

  createCardRecipe() {
    this.card = document.createElement("article")
    this.card.className = "recipeCard"

    const image = document.createElement("img")
    // Ajoute le lien de l'image de la recette à la balise img
    this.card.appendChild(image)

    const titleDuration = document.createElement("div")
    titleDuration.className = "duration"

    const title = document.createElement("h1")
    title.textContent = this.name
    titleDuration.appendChild(title)

    const duration = document.createElement("div")
    duration.innerHTML =
      '<i class="far fa-clock"></i><span class="time">' +
      this.time +
      " min</span>"
    titleDuration.appendChild(duration)

    this.card.appendChild(titleDuration)

    const detail = document.createElement("div")
    detail.className = "detail"

    const recipeDetail = document.createElement("div")
    recipeDetail.className = "detailRecipe"

    const ingredients = this.ingredients

    if (Array.isArray(ingredients) && ingredients.length > 0) {
      for (const ingredient of ingredients) {
        const h2 = document.createElement("h2")
        //Ne pas afficher les deux points quand il n'y a pas de quantité
        if (!ingredient.quantity) {
          h2.textContent = ingredient.ingredient
        } else {
          h2.textContent = ingredient.ingredient + " " + ":"
        }

        recipeDetail.appendChild(h2)

        const quantite = document.createElement("p")

        //Ne pas afficher de valeur nulle pour unite si elle n'est pas présente dans recipes.js
        if (!ingredient.unit) {
          quantite.textContent = ingredient.quantity
        }
        //Modifier le mot "grammes" par "g"
        else if (ingredient.unit == "grammes") {
          quantite.textContent = " " + ingredient.quantity + " " + "g"
        } else {
          quantite.textContent =
            " " + ingredient.quantity + " " + ingredient.unit
        }

        h2.appendChild(quantite)
      }
    }

    detail.appendChild(recipeDetail)

    const description = document.createElement("div")
    description.className = "detailDescription"

    const comment = document.createElement("p")
    comment.textContent = this.description
    description.appendChild(comment)

    detail.appendChild(description)

    this.card.appendChild(detail)

    return this.card
  }
}

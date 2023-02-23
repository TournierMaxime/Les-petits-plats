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

    this.image = document.createElement("img")
    // Ajoute le lien de l'image de la recette à la balise img
    this.card.appendChild(this.image)

    this.titleDuration = document.createElement("div")
    this.titleDuration.className = "duration"

    this.title = document.createElement("h1")
    this.title.textContent = this.name
    this.titleDuration.appendChild(this.title)

    this.duration = document.createElement("div")
    this.duration.innerHTML =
      '<i class="far fa-clock"></i><span class="time">' +
      this.time +
      " min</span>"
      this.titleDuration.appendChild(this.duration)

    this.card.appendChild(this.titleDuration)

    this.detail = document.createElement("div")
    this.detail.className = "detail"

    this.recipeDetail = document.createElement("div")
    this.recipeDetail.className = "detailRecipe"

    if (Array.isArray(this.ingredients) && this.ingredients.length > 0) {
      for (let ingredient of this.ingredients) {
        this.titleH2 = document.createElement("h2")
        //Ne pas afficher les deux points quand il n'y a pas de quantité
        if (!ingredient.quantity) {
          this.titleH2.textContent = ingredient.ingredient
        } else {
          this.titleH2.textContent = ingredient.ingredient + " " + ":"
        }

        this.recipeDetail.appendChild(this.titleH2)

        this.quantity = document.createElement("p")

        //Ne pas afficher de valeur nulle pour unite si elle n'est pas présente dans recipes.js
        if (!ingredient.unit) {
          this.quantity.textContent = ingredient.quantity
        }
        //Modifier le mot "grammes" par "g"
        else if (ingredient.unit == "grammes") {
          this.quantity.textContent = " " + ingredient.quantity + " " + "g"
        } else {
          this.quantity.textContent =
            " " + ingredient.quantity + " " + ingredient.unit
        }

        this.titleH2.appendChild(this.quantity)
      }
    }

    this.detail.appendChild(this.recipeDetail)

    this.boxDescription = document.createElement("div")
    this.boxDescription.className = "detailDescription"

    this.comment = document.createElement("p")
    this.comment.textContent = this.description
    this.boxDescription.appendChild(this.comment)

    this.detail.appendChild(this.boxDescription)

    this.card.appendChild(this.detail)

    return this.card
  }
}

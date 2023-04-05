// Saved Recipes page functionality
window.addEventListener("load", displaySavedRecipes);

export function displaySavedRecipes() {
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || []; // get existing saved recipes or an empty array
  const savedRecipesContainer = document.getElementById("saved-recipes-container");

  // Check if savedRecipesContainer exists before adding saved recipes
  if (savedRecipesContainer) {
    savedRecipesContainer.innerHTML = ""; // clear the container before adding new recipes

    savedRecipes.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe); // create a recipe card for each saved recipe
      recipeCard.addEventListener("click", () => {
        displayRecipe(recipe); // display the full recipe when the card is clicked
      });
      savedRecipesContainer.appendChild(recipeCard);
    });
  }
}


function createRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  
  const imageElement = document.createElement("img");
  imageElement.src = recipe.image;
  imageElement.alt = recipe.title;
  recipeCard.appendChild(imageElement);
  
  const titleElement = document.createElement("h3");
  titleElement.textContent = recipe.title;
  recipeCard.appendChild(titleElement);
  
  return recipeCard;
}

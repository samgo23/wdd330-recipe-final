export async function getRandomRecipe(apiKey) {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
    const data = await response.json();
    const recipe = data.recipes[0];
    console.log(recipe);
    displayRecipe(recipe)
    return recipe;
  }
  
  const apiKey = '80cf1614d6df4af9a16d5be110db7167';
  const recipe = getRandomRecipe(apiKey);
  console.log(recipe);
  
  
  // Get the recipe information from the API response
  // and display it on the page
  
  function displayRecipe(recipe) {
    const recipeContainerElement = document.querySelector("#recipe-container");
  
    // Check if recipeContainerElement exists before adding recipe
    if (recipeContainerElement) {
      // Add recipe information to the DOM
      const titleElement = document.createElement("h2");
      const readyInMinutesElement = document.createElement("p");
      const servingsElement = document.createElement("p");
      const summaryElement = document.createElement("p");
      const imageElement = document.createElement("img");
      const instructionsElement = document.createElement("ol");
  
      titleElement.textContent = recipe.title;
      readyInMinutesElement.textContent = `Ready in ${recipe.readyInMinutes} minutes`;
      servingsElement.textContent = `Serves ${recipe.servings}`;
      summaryElement.innerHTML = recipe.summary;
      imageElement.src = recipe.image;
  
      recipe.instructions.split("\n").forEach(step => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = step;
        const stepElement = document.createElement("li");
        stepElement.appendChild(tempElement.firstChild);
        instructionsElement.appendChild(stepElement);
      });
  
      recipeContainerElement.appendChild(titleElement);
      recipeContainerElement.appendChild(readyInMinutesElement);
      recipeContainerElement.appendChild(servingsElement);
      recipeContainerElement.appendChild(summaryElement);
      recipeContainerElement.appendChild(imageElement);
      recipeContainerElement.appendChild(instructionsElement);
  
      saveRecipeButton();
  
      const newRecipeButton = document.querySelector("#new-recipe-button");
      newRecipeButton.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }
  
// Save recipe button functionality
function saveRecipeButton() {
if (document.getElementById("save-recipe-button")) {
    try {
    const saveRecipeButton = document.getElementById("save-recipe-button");
    saveRecipeButton.addEventListener("click", saveRecipe);
    } catch (error) {
    console.error(error);
    }
}};

async function saveRecipe() {
try {
    const recipe = await getRandomRecipe(apiKey);
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    alert('Recipe saved!');
} catch (error) {
    console.error(error);
}
}
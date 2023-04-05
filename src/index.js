import { loadHeaderFooter } from "./utils.mjs";

//console.log('Hello World');
// loadHeaderFooter();

async function getRandomRecipe(apiKey) {
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

  const recipeContainerElement = document.querySelector("#recipe-container");
  recipeContainerElement.appendChild(titleElement);
  recipeContainerElement.appendChild(readyInMinutesElement);
  recipeContainerElement.appendChild(servingsElement);
  recipeContainerElement.appendChild(summaryElement);
  recipeContainerElement.appendChild(imageElement);
  recipeContainerElement.appendChild(instructionsElement);
}

const newRecipeButton = document.getElementById("new-recipe-button");

newRecipeButton.addEventListener("click", () => {
  window.location.reload();
});


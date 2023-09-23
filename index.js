// We define the API key for accessing recipe data (we should keep this secret)
const API_KEY = "275d58779ccf4e22af03e792e8819fff";

// We get a reference to the HTML element with the ID "recipe-list"
const recipeListEl = document.getElementById("recipe-list");

// We create a function to display recipes on the webpage
function displayRecipes(recipes) {
  // First, we clear any existing content in the "recipe-list" element
  recipeListEl.innerHTML = "";

  // Then, we loop through each recipe in the provided array
  recipes.forEach((recipe) => {
    // We create a list item element for the recipe
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");

    // We create an image element for the recipe
    recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = "recipe image";

    // We create an element for the recipe title
    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    // We create an element for the recipe ingredients and format it
    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
    `;

    // We create a link to view the full recipe
    recipeLinkEl = document.createElement("a");
    recipeLinkEl.href = recipe.sourceUrl;
    recipeLinkEl.innerText = "View Recipe";

    // We append the image, title, ingredients, and link to the recipe item
    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeLinkEl);

    // We append the recipe item to the "recipe-list" element
    recipeListEl.appendChild(recipeItemEl);
  });
}

// We create a function to fetch recipes from an external API
async function getRecipes() {
  // We construct the API URL with the API key to fetch random recipes (in this case, 10 recipes)
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  // We parse the response data as JSON
  const data = await response.json();

  // We return the array of recipes from the data
  return data.recipes;
}

// We initialize the application by fetching recipes and displaying them
async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

// We call the init function to start the application
init();

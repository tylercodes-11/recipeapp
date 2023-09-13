// page first loads, it should display a random recipe, complete   with a picture of the meal.

//  Name of the meal, a button to watch the YouTube video

// The instructions of how to make the meal, along with the list of ingredients.

const btn = document.querySelector(".btn");
const mealDiv = document.querySelector(".meal");

// fetchMealsFromApi function
function fetchMealsFromApi() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => {
        createMeal(response.meals[0]);
    })
    .catch(error => {
        console.log(error);
    });
}

// On load Event Listener
window.addEventListener("load", () => {
    fetchMealsFromApi();
});

// Button Event 
btn.addEventListener('click', () => {
	fetchMealsFromApi();
});

// createMeal Function
const createMeal = (meal) => {
	const ingredients = []; //empty ingredients array

	// Get all ingredients. (20)
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
			);
		} else {
			// stop if no more ingredients
			break;
		}
	}

    // For the properties not available, returned empty string using Ternary Operator

	const newHTML = 
    `
    <div class="container">
    <div class="mealHeader ">
     <h2 class=" mealName text-capitalize ">${meal.strMeal}</h2>
     ${
        meal.strYoutube
            ? `
            <iframe width="650" height="615"
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </iframe>
            `
            : `<img class="col mealImage" src="${meal.strMealThumb}" alt="Meal Image" />`
        }
        </div>
    
        <div>
        <div class="ingredients">
         <h2>Ingredients </h2>
         <ul >
         ${ingredients.map(ingredient => `<li class="ingredient">${ingredient}</li>`).join("")}
          </ul>
          </div>
   
     
    <h2>Recipe Instructions</h2>
    <p class="mealInstructions">
    ${meal.strInstructions}
    </p>
      </div>  
    </div>
    </div>
    `
    
    mealDiv.innerHTML = newHTML;
};
{/* <img class="col mealImage" src="${meal.strMealThumb}" alt="Meal Image"> */}
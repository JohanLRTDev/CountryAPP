const result = document.getElementById("result"); // récupération de l'élément HTML qui affichera les données
const form = document.querySelector("form"); // récupération du formulaire
const input = document.querySelector("input"); // récupération de l'input
let meals = []; // tableau qui va contenir les données des plats;

const fetchMeals = async (search) => {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then(
      (data) => (meals = data.meals) // on stocke les données des plats dans le tableau meals
    );
  console.log(meals); // on affiche les données des plats dans la console
};

const mealsDisplay = () => {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat trouvé</h2>";
  } else {
    meals.length = 12; //limite le nombre de plats affichés à 12
    result.innerHTML = meals
      .map(
        (meal) => `
          <li class="card">
          <h2>${meal.strMeal}:</h2>
          <p>${meal.strArea}</p>
          <img src="${meal.strMealThumb}" alt="photo${meal.strMeal}">
          <ul></ul>
          </li>`
      )
      .join("");
  }
};
//a chaque fois qu'on tape dans l'input, on appelle la fonction fetchMeals avec la valeur de l'input(optimise la performance du code)
input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

// a l'appui sur entré on appelle la fonction fetchMeals et mealsDisplay
form.addEventListener("submit", (e) => {
  e.preventDefault(); // on empêche le formulaire de soumettre les données sur le serveur
  mealsDisplay();
});

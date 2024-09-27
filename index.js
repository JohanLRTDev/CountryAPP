const countriesContainer = document.querySelector(".countries-container");
let dataCountries = []; //tableau qui contient les données des pays
let dataCountryFilter = []; //tableau qui contient les données filtrée par la demande de recherche
let countryToDisplay = [];

//charge les données à partir de l'API
const fetchData = async () => {
  await fetch("https://restcountries.com/v2/all")
    .then((res) => res.json())
    .then((data) => (dataCountries = data));
};

//affiche les données des pays dans la page html
const dataCountriesDisplay = () => {
  // ternaire qui permet d'afficher les données filtrées si une recherche est effectuée ou tout les donné si rien n'est rentré
  countryToDisplay =
    dataCountryFilter.length > 0 ? dataCountryFilter : dataCountries;
  //ajoute du HTML pour chaque pays a chaque tour de MAP
  countriesContainer.innerHTML = countryToDisplay
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `<li><img src="${country.flag}" alt="Drapeau de ${country.name}">
      <h2>${country.name}</h2>
      <p>${country.capital}</p>
      <p>${country.population} habitants</p>
      </li>`
    )
    .join("");
};
//gere le trie pays en fonction du choix utilisateur
const trieOption = () => {
  minToMax.addEventListener("click", () => {
    countryToDisplay.sort((a, b) => a.population - b.population); //tri par population croissante
    dataCountriesDisplay();
  });
  maxToMin.addEventListener("click", () => {
    countryToDisplay.sort((a, b) => b.population - a.population);
    dataCountriesDisplay();
  });
  alpha.addEventListener("click", () => {
    countryToDisplay.sort((a, b) => a.name.localeCompare(b.name));
    dataCountriesDisplay();
  });
};
trieOption();

//lance la recupération des donné API et sont affichage au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
  dataCountriesDisplay();
});

//filtre les donné par rapport a la recherche utilisateur
inputSearch.addEventListener("input", (e) => {
  //stock les données des pays filtrées dans le tableau dataCountryFilter
  dataCountryFilter = dataCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase()) //comparaison de la valeur de l'input avec le nom du pays en minuscule
  );

  if (dataCountryFilter.length < 1) {
    alert("Aucun pays ne correspond à votre recherche.");
    e.target.value = "";
  }
  dataCountriesDisplay(); //affichage des données filtrées
});
//ecoute le changement de la valeur du range pour afficher la valeur dans le span
document.addEventListener("input", () => {
  rangeValue.textContent = inputRange.value;
  dataCountriesDisplay(); //affichage des données filtrées
});

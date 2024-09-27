const countriesContainer = document.querySelector(".countries-container");

let dataCountries = []; //tableau qui contient les données des pays
let datacountriesFilter = []; //tableau qui contient les données filtrée par la demande de recherche

//charge les données à partir de l'API
const fetchData = async () => {
  await fetch("https://restcountries.com/v2/all")
    .then((res) => res.json())
    .then((data) => (dataCountries = data));
};

//affiche les données des pays dans la page html
const dataCountriesDisplay = () => {
  if (datacountriesFilter.length > 0) {
    countriesContainer.innerHTML = datacountriesFilter
      .map(
        (country) =>
          `<li><img src="${country.flag}" alt="Drapeau de ${country.name}">
      <h2>${country.name}</h2>
      <p>${country.capital}</p>
      <p>${country.population} habitants</p>
      </li>`
      )
      .join("");
  } else {
    countriesContainer.innerHTML = dataCountries
      .map(
        (country) =>
          `<li><img src="${country.flag}" alt="Drapeau de ${country.name}">
    <h2>${country.name}</h2>
    <p>${country.capital}</p>
    <p>${country.population} habitants</p>
    </li>`
      )
      .join("");
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
  dataCountriesDisplay();
});

//ecouteur d'événement pour le changement de la valeur de l'input de recherche
inputSearch.addEventListener("input", (e) => {
  //stock les données des pays filtrées dans le tableau datacountriesFilter
  datacountriesFilter = dataCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase()) //comparaison de la valeur de l'input avec le nom du pays en minuscule
  );
  dataCountriesDisplay();
});

// // 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// // 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

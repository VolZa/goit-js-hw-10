import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

// function clearCountryInfo() {
//   refs.countryInfoEl.innerHTML = '';
// }

// function clearCountrysList() {
//   refs.countryListEl.innerHTML = '';
// }




refs.inputEl.addEventListener(
  'input',
  debounce(e => {
    //видалення початкових та кінцевих пробілів
    const searchQuery = refs.inputEl.value.trim();
    cleanElCountry(); 
      // clearCountryInfo();
      // clearCountrysList();
   
    // якщо немає значення - очистити список та вийти з функції
    if (!searchQuery) {cleanElCountry(); return;}

      // отримання списку країн
      fetchCountries(searchQuery).then(foundData => {

        // якщо знайдено більше 10 країн - виводимо сповіщення
        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );

          // якщо знайдено 0 країн - виводимо сповіщення
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');

          // якщо знайдено >= 2 країн і <= 10 виводимо на сторінку дані
        } else if (foundData.length >= 2 && foundData.length <= 10) {

          renderCountryList(foundData); // вивід списку-країн на сторінку

          // якщо знайдена 1 країна - виводимо на сторінку 1 країну
        } else if (foundData.length === 1) {
          renderOneCountry(foundData); // вивід 1 країни на сторінку
        }
      });
    }
  , DEBOUNCE_DELAY) // затримка для запиту
);

// вставлення розмітки на сторінку
// function renderCountryList(countries) {

//   // перебір країн з масиву об'єктів
//   const markup = countries
//     .map(country => {
//       return `<li>
//       <img src="${country.flags.svg}" alt="Flag of ${country.name.official
//         }" width="30" hight="20">
//          <p>${country.name.official}</p>
//                 </li>`;
//     })
//     .join(''); // сполучити рядки

//   // вставлення li в ul на сторінку
//   refs.countryListEl.innerHTML = markup;
// }

function renderCountryList(countries) { 
  const liElst = countries.map(country => {
   const { name, flags } = country;
    return `<li class='country-list__item'>
        <img src='${flags.svg} ' alt='Flag of${name.official}' class='country-flag' width ='30' hight='20'>
        <h2 class='country-name'>  ${country.name.official}</h2>
      </li>`;
  });
 
    refs.countryListEl.innerHTML = liElst.join('');
}


// вставлення розмітки картки країни
function renderOneCountry(countries) {
  // clearCountrysList();
  // перебір країни з масиву об'єктів
  const markup = countries
    .map(country => {
      const languages = Object.values(country.languages); //.split(',').join(', ')
      return `<li>
      <img src='${country.flags.svg}' alt='Flag of ${country.name.official
        }' width='30' hight='20'>
         <p>${country.name.official}</p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${languages} </p>
                </li>`;
    })
    .join(''); // сполучити рядки

  // вставлення li в ul на сторінку
  refs.countryInfoEl.innerHTML = markup;
}

// очистка html елементів для виводу нових даних
function cleanElCountry() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}




// // country.name.official

// function renderCountryCard(country) {
//   const { name, capital, population, flags } = country;
//   const countryCard = `
//     <div class="country-card">
//       <img src="${flags}" alt="${name}" class="country-flag" width ="30" hight="20">
//       <h2 class="country-name">${name}</h2>
//       <p class="country-capital">${capital}</p>
//       <p class="country-population">${population}</p>
//     </div>
//   `;
//   refs.countryListEl.insertAdjacentHTML('beforeend', countryCard);
// }



// refs.inputEl.addEventListener('input', debounce(e => { 
//   onSearch(e);
// }, DEBOUNCE_DELAY));

// function onSearch(event) { 
//   const searchQuery = event.target.value.trim();
//   clearCountrysList();
//   clearCountryInfo();

//   if (!searchQuery) {
//     clearCountrysList();
//     return;
//   }

//   fetchCountries(searchQuery)
//     .then(countries => {
//       if (countries.length === 1) {
//         renderCountryCard(countries);
//       } else if (countries.length > 1 && countries.length <= 10) {
//         renderCountryList(countries);
//       } else if (countries.length > 10) {
//         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//       } else {
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

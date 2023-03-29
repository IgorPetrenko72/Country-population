import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import getRefs from './get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs(); 

refs.input.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

async function onSearch(e) {
    try {
        e.preventDefault();
    clearCountryContainer();
    const name = e.target.value.trim();
    if (name === "") {
    return;
    }
    fetchCountries(name)
        .then(response => {
        if (response.status === 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        return response.json();
    })
    .then(renderCountryContainer)
    }
    
    catch(error) {
            console.log(error)
    };
};

function clearCountryContainer() {
   refs.countryInfo.innerHTML = ``; 
};

function renderCountryContainer(country) {
if (country.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please, enter a more specific name.');  
            return; 
        }
        if (country.length === 1) {
        Notiflix.Notify.success('Information of the Country');
        const cardMarkup = country.map(({ flags, name, capital, population, languages }) => {
            languages = Object.values(languages).join(", ");
        return `<img src="${flags.svg}" alt="${name}" width="320" height="auto">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${languages}</span></p>`;
        }).join(''); 
            refs.countryInfo.innerHTML = cardMarkup;
            return cardMarkup;
        }
        if (country.length > 1 && country.length <= 10) {
          const listMarkup = country.map((({ name, flags }) => {
        return `<li>
                        <img src="${flags.svg}" alt="${name}" width="60" height="auto">
                        <span>${name.official}</span>
                </li>`;
    })).join('');
    refs.countryInfo.innerHTML = listMarkup;
    return listMarkup;  
        }
};
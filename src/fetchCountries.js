const BASE_URL = `https://restcountries.com/v3.1/name`;

export const fetchCountries = async (name) => {
return await fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
};


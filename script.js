const request = new XMLHttpRequest();

request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
request.send();
request.onload = function () {
    let countryData = JSON.parse(this.response);
    totalPopulation(countryData)
    let asianCountries = filterCountriesInAsia(countryData);
    let populationLessThenTwoLacks = filterCountriesByPopulation(countryData, 200000);
    printCountyDetails(countryData)
    countriesUsingDollar(countryData)
    console.log(populationLessThenTwoLacks)
    console.log(asianCountries)
}

//Print the total population of countries using the reduce method.
function totalPopulation(allCountries) {
    if (allCountries.length > 0) {
        let population = allCountries.reduce((population, country) => {
            return population + country.population;
        }, 0);
        console.log(population);
    }
}

//Get all the countries from Asia continent / “region” using Filter method
function filterCountriesInAsia(allCountries) {
    let asianCountries = [];
    //process if the countries count greater than 0
    if (allCountries.length > 0) {
        //filter countries who's region is under "Asia"
        asianCountries = allCountries.filter((country) => {
            return country.region === "Asia";
        })
    }
    return asianCountries;
}

// Print the country which uses US Dollars as currency.
function countriesUsingDollar(allCountries) {
    //process if the countries count greater than 0
    if (allCountries.length > 0) {
        //filter countries who's currency is dollar
        allCountries.forEach((country) => {
            let currencies = country.currencies;
            let usDollarCurrency = currencies.filter((currency) => {
                return currency.code === "USD";
            })
            if (usDollarCurrency.length > 0) {
                console.log(country.name)
            }
        })
    }
}

//Get all the countries with population of less than 2 lacs using Filter method
function filterCountriesByPopulation(allCountries, maxPopulation) {
    let asianCountries = [];
    //process if the countries count greater than 0
    if (allCountries.length > 0) {
        //filter countries who's population is less than max population
        asianCountries = allCountries.filter((country) => {
            return country.population < maxPopulation;
        })
    }
    return asianCountries;
}

//Print the following details name, capital, flag using forEach.
function printCountyDetails(allCountries) {
    //process if the countries count greater than 0
    if (allCountries.length > 0) {
        //Print the details name, capital, flag of country
        allCountries.forEach((country, index) => {
            console.log(`Name: ${country.name};Capital: ${country.capital}; Flag:${country.flag}`)
        })
    }
}

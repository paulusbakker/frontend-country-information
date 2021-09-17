// 1.
// maak button in de HTML file
// maak een fechtDataBelgium functie die de data over belgie ophaalt
// koppel de button en functie aan elkaar
// log dit in de console

// globale variabelen omdat ik het verwarrend vind steeds per functie nieuwe variabelen aan te maken
let countryFlag, countryName, sentence1, sentence2, spokenLanguages = '';
const countryInfo = document.getElementById("countryInfo");

// opvragen van data, wordt aangeroepen door de eventhandler elders
async function fetchData(countryValue) {
    try {
        const {data} = await axios.get(`https://restcountries.eu/rest/v2/name/${countryValue}?fullText=true`);
        // destructering
        const country = data[0];

        countryFlag = country.flag;
        countryName = country.name;


        sentence1 = `${countryName} is situated in ${country.subregion}. It has a population of ${country.population} people.`;
        currencies = currenciesFrase(country.currencies);
        sentence2 = `The capital is ${country.capital} ${currencies}`;
        spokenLanguages = spokenLanguagesFrase(country.languages);

        // in de DOM injecteren
        print();


    } catch (error) {
        // alle children eerst weghalen
        removeChildren();
        //foutmelding
        const errorMessage = document.createElement('h1');
        errorMessage.textContent = "No existing country!";
        countryInfo.appendChild(errorMessage);
    }
}

// curriencies in een zin zetten
function currenciesFrase(currencies) {
    let currenciesFrase = `and you can pay with ${currencies[0].name}'s`;
    for (let i = 1; i < currencies.length; i++) {
        currenciesFrase += `and ${currencies[i].name}`
    }
    return currenciesFrase + '.'
}

// talen in een zin zetten
function spokenLanguagesFrase(languages) {
    let spokenLanguagesFrase = `They speak ${languages[0].name}`;
// bij meer dan één taal
    for (let i = 1; i < languages.length; i++) {
        // bij meer dan 2 talen een komma tussen de eerste en tweede taal
        if (i === 1 && languages.length > 2) {
            spokenLanguagesFrase += `, ${languages[1].name}`;
        } else {
            spokenLanguagesFrase += ` and ${languages[i].name}`;
        }
    }
    return spokenLanguagesFrase + '.';
}

// functie voor het injecteren in de DOM
function print() {
    // alle children eerst weghalen, beginnen met leeg scherm
    removeChildren();

    // maken van de vlag
    const printFlag = document.createElement('img');
    printFlag.src = countryFlag;
    printFlag.width = "300";
    countryInfo.appendChild(printFlag)

    // maken van de landnaam
    const printCountryName = document.createElement('p');
    printCountryName.textContent = countryName;
    countryInfo.appendChild(printCountryName);

    // eerste zin
    const printSentence1 = document.createElement('p');
    printSentence1.textContent = sentence1;
    countryInfo.appendChild(printSentence1);

    // tweede zin
    const printSentence2 = document.createElement('p');
    printSentence2.textContent = sentence2;
    countryInfo.appendChild(printSentence2);

    // gesproken talen
    const printSpokenLanguages = document.createElement('p');
    printSpokenLanguages.textContent = spokenLanguages;
    countryInfo.appendChild(printSpokenLanguages);
}

// eventlistener zetten op het zoekveld
const query = document.getElementById("searchCountry");
query.addEventListener("keypress", (event) => {
    // zoek het land als er op enter is gedrukt en het veld niet leeg is
    if (event.key === 'Enter' && event.target.value) {
        fetchData(event.target.value);
        // zoekveld weer leeg maken voor volgende opdracht
        event.target.value = '';
    }
})

// alle children weghalen om de pagina te legen
function removeChildren() {
    // weghalen van toegevoegde children zolang er children zijn
    while (countryInfo.firstChild) {
        countryInfo.removeChild(countryInfo.lastChild)
    }
}

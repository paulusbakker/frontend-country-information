// 1.
// maak button in de HTML file
// maak een fechtDataBelgium functie die de data over belgie ophaalt
// koppel de button en functie aan elkaar
// log dit in de console

async function fetchDataBelgium() {
    try {
        const result = await axios.get('https://restcountries.eu/rest/v2/alpha/bel');
        console.log(result.data);
    } catch (error) {
        console.error(error);
    }
}

const dataFetchbutton = document.getElementById("dataFetchButtonBelgium");
dataFetchbutton.addEventListener("click", fetchDataBelgium)

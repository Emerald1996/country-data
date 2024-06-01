import { CONTINENTS_API, COUNTRY_API } from "./config.js";

import { renderCountry, renderError } from "./renderCountryData.js";
import { mapFunctionality } from "./renderMap.js";


const sideMenu = document.getElementById('sideMenu')
const htmlContent = document.querySelector('.countryDesc-container');


const errMsg = document.querySelector('.error')


const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];




function showContinents() {
    const continentList = document.querySelector('.continent__list');
    
    continents.forEach(continent => {
        // console.log(continent);
        const listItem = document.createElement('li');
        listItem.textContent = continent;
        listItem.style.color = '#fff';
        listItem.addEventListener('click', () => showCountriesByContinent(continent.toLowerCase()));
        continentList.appendChild(listItem);
    });

}

showContinents();





const showCountriesByContinent = async function(continent) {
    const countriesList = document.getElementById('countries-list');
    
    const countryText = document.getElementById('country__text')
    try {
        errMsg.innerHTML = ''
        countriesList.innerHTML = ''

        showLoader()

        const response = await fetch(`${CONTINENTS_API}${continent}`);

        countryText.textContent = `These are all countries under ${continent.toUpperCase()}`
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const countries = await response.json();
        // console.log(countries);
        showCountries(countries);

        removeLoader()
        } catch (error) {
        renderError('Something went wrong', 'red')
        console.error('Failed to fetch countries:', error);
    }
}




const showCountries = function(countries) {
    const countriesList = document.getElementById('countries-list');
    countriesList.innerHTML = ''; 
    htmlContent.innerHTML = ''
    
    countries.forEach(country => {
  
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country-item'; 

        const flagImg = document.createElement('img');
        flagImg.src = country.flags.png;
        flagImg.alt = `${country.name.common} flag`;

        const listItem = document.createElement('p');
        listItem.textContent = country.name.common;

        // Append the image and p elements to the div
        countryDiv.appendChild(flagImg);
        countryDiv.appendChild(listItem);


        countriesList.appendChild(countryDiv);

        countryDiv.addEventListener('click', () => fetchCountryDesc(country.name.common));
    
    });
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end of DOM Manipulation >>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Render countries data on click >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const fetchCountryDesc = async function(countryName) {

const countriesList = document.getElementById('countries-list');
const countryText = document.getElementById('country__text')


countriesList.innerHTML = ''; 

const url = `${COUNTRY_API}/${countryName}`;

try {
    
        countryText.textContent = `Here is a little detail about ${countryName}, you can explore on the map as well. 😉`
        showLoader()
        const response = await fetch(url)

        const  data = await response.json()

        if(!data) throw new Error(renderError('Country data not found ❌', 'red'))

        renderCountry(data[0])
        
    
    
        // Fetch map
        mapFunctionality(data)
        removeLoader()
    
    } catch (error) {
        errMsg.innerHTML = ''
        renderError('There was a problem getting country detail,Try again!... 😥', 'red')
        removeLoader()

        console.log('Error fetching country data:', error);
        
    }
}




// >>>>>>>>>>>>>>>>>>>>>>>>>>> Render country by searching >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const fetchCountryDataOnSearch =  function () {

    
  const countryText = document.getElementById('country__text')
  const searchButton = document.getElementById('button')
  const searchData = document.querySelector('.countryDesc-container')

  searchButton.addEventListener('click', async function() {
  const countryInput = document.getElementById('countryInput');
  const countriesList = document.getElementById('countries-list');
  countriesList.innerHTML = ''; 

  searchData.innerHTML = ''

    const url = `${COUNTRY_API}/${countryInput.value}`;
    try {
        errMsg.innerHTML = ''
        countryText.textContent = `Here is a little detail about ${countryInput.value}, you can explore on the map as well. 😉`
        showLoader()
        const response = await fetch(url)

        const  data = await response.json()
        if(!data) throw new Error(renderError('Country data not found ❌', 'red'))
        renderCountry(data[0])
    
    
        // Fetch map
        mapFunctionality(data)

        removeLoader()
 
    
    } catch (error) {
            errMsg.innerHTML = ''
            renderError('There was a problem getting country detail... 😥', 'red')
            removeLoader()

            console.log('Error fetching country data:', error);
        
        }
        countryInput.value = ''

  })

        
}

fetchCountryDataOnSearch()




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Menu__Links >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function openMenu(){
    const openBtn = document.querySelector('.bx-menu').addEventListener('click', () => sideMenu.style.right = "0");
}
openMenu()

function closeMenu(){
    const closeBtn = document.querySelector('.bx-x').addEventListener('click', () => sideMenu.style.right = "-600px");

}
closeMenu()

function closeLinks() {
    const links = document.querySelectorAll("ul li")
    console.log(links);

    links.forEach(link => {
        link.addEventListener('click', function() {
            sideMenu.style.right = "-600px";
        })
    })
}
closeLinks()



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Loader >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const showLoader = function () {
    const loader = document.querySelector('.loader')
    loader.style.display = 'block'
}
const removeLoader = function () {
    const loader = document.querySelector('.loader')
    loader.style.display = 'none'
}

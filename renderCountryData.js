export const renderCountry = function (data) {
  const htmlContent = document.querySelector('.countryDesc-container');

  const html = `
  <article class="country">
      <img class="country-img" src="${data.flags.png}" />
      <div class="country-data">
        <div class="ctry_and_capital">
          <h2 class="country-name">${data.name.common}</h2>
          <p class="country-capital">${data.capital}</p>
        </div>
        <h4 class="country-region">🌎Located at ${data.subregion}, in ${data.region} region.</h4>
        <p class="country-population"><span>👫Has about </span>${(
        +data.population / 1000000
        ).toFixed(1)}m people</p>
        <p class="country-lang"><span>🗣️ ${data.name.common} speaks </span>${Object.values(data.languages).join(', ')}</p>
        <p class="country-currency"><span>💵Currency is </span>${Object.values(data.currencies).map(currency => currency.name)}</p>
      </div>

  </article> 
  <div id="map"></div>

  
  `;
  // htmlContent.innerHTML = ''
  htmlContent.insertAdjacentHTML('afterbegin', html);

};


export const renderError = function (errorMsg, color) {
  const errMsg = document.querySelector('.error')
  const error = `
    <div>
      <p style="color: ${color}">${errorMsg}</p>
    </div>
  `
  errMsg.innerHTML = error
};
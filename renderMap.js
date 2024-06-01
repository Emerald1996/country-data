export const mapFunctionality = function (data) {

    const latitude = data[0].capitalInfo.latlng[0]
    const longitude = data[0].capitalInfo.latlng[1]

    console.log(latitude, longitude);

    const coordinates = [latitude, longitude]

    const map = L.map('map').setView(coordinates, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker(coordinates).addTo(map);

    const popup = L.popup()
    .setLatLng(coordinates)
    .setContent(`${data[0].name.common}`)
    .openOn(map);

    const circle = L.circle(coordinates, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);


    map.fitBounds(circle.getBounds())

    
}
var map = map = L.map('mapid').setView([25.0123025, 121.4632665], 18);

//const garbagetruckIconUrl = "../img/garbage-truck-light-matting.png"; // use in local
const garbagetruckIconUrl = "img/garbage-truck-light-matting.png"; // use in Github Pages

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2V2aW44MjNsaW4iLCJhIjoiY2tzNnhjeXpoMGdqaDJwczBzMWN5MTY2NSJ9.Xy3HFTAIxMeTMxsj8WQrFQ'
}).addTo(map);

var supports = {
    geolocation: !!navigator.geolocation
};
if (supports.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    });
}
var garbagetruckIcon = L.icon({
    iconUrl: garbagetruckIconUrl,
    iconSize: [50, 50]
});
var request = new XMLHttpRequest();
var car;
const cors = 'https://cors.kevin823lin.codes/';
const url = 'https://data.ntpc.gov.tw/api/datasets/28AB4122-60E1-4065-98E5-ABCCB69AACA6/json';
const token = '';
request.open('GET', `${cors}?url=${url}&token=${token}`, true);
request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200) {
            cars = JSON.parse(request.responseText);
            cars.forEach(car => {
                var time = car.time.split(' ');
                if (time.length > 0) {
                    car.time = time[1];
                }
                var marker = L.marker([car.latitude, car.longitude], { title: car.car, icon: garbagetruckIcon }).addTo(map);
                marker.bindPopup("<b>" + `${car.car}` + "</b>&nbsp;&nbsp;&nbsp;&nbsp;" + `${car.time}` + "<br><b>" + `${car.location}` + "</b>") ;
            });
        }
    }
};
request.send();
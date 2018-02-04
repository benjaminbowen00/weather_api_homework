var waitAndAddMarker = function(map){
  setTimeout(function() {
    let weatherData = getWeatherData();
    let lat = weatherData.city.coord.lat;
    let lng = weatherData.city.coord.lon;
    let coords = {lat: lat, lng: lng};
    let city = weatherData.city.name;
    let marker = map.addMarker(coords);

    var infowindow = new google.maps.InfoWindow({
      content: city});

      infowindow.open(map, marker);

      // console.log('this is:', this);
    }, 1000);
  }

var waitAndAddSecondMarker = function(map){
  setTimeout(function() {
    let weatherData = getSecondWeatherData();
    console.log(weatherData[0]);
    let lat = weatherData.city.coord.lat;
    let lng = weatherData.city.coord.lon;
    let coords = {lat: lat, lng: lng};
    let city = weatherData.city.name;
    let marker = map.addSecondMarker(coords);

    let infowindow = new google.maps.InfoWindow({
      content: city});

    infowindow.open(map, marker);

  }, 1000);
}

var app = function(){

  formCitiesDropDown();
  formSecondCitiesDropDown();

  var container = document.getElementById('main-map');
  var center = {lat: 55, lng: -2};
  var mainMap = new Map(container, center, 5);



  var select = document.querySelector('#select-city');
  var selectSecond = document.querySelector('#select-second-city');
  select.addEventListener('change', handleCitySelected);
  selectSecond.addEventListener('change', handleSecondCitySelected)
  select.addEventListener('change', function(){waitAndAddMarker(mainMap);})
  selectSecond.addEventListener('change', function(){waitAndAddSecondMarker(mainMap);})

  console.log(mainMap.markers);






}

window.addEventListener('load', app);

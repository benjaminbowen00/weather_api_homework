var waitAndAddMarker = function(map){
  setTimeout(function() {
    let weatherData = getWeatherData();
    let lat = weatherData.city.coord.lat;
    let lng = weatherData.city.coord.lon;
    let coords = {lat: lat, lng: lng};
    map.addMarker(coords);
            console.log('this is:', this);
          }, 2000);

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

  console.log(mainMap.markers);






}

window.addEventListener('load', app);

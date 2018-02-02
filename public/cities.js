var createTopOption = function(){
  var optionAtTop = document.createElement('option');
  optionAtTop.innerText  = "Select a city"
  optionAtTop.disabled = true;
  optionAtTop.selected = true;
  return optionAtTop;
}

var formCitiesDropDown = function(){

  var select = document.querySelector('#select-city');
  select.appendChild(createTopOption());
  citiesArray.forEach(function(city){
    var option = document.createElement('option');
    option.innerText = city.name;
    option.value = city.id;
    select.appendChild(option);
  })
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){

  if (this.status !== 200) {return;}
  var jsonString = this.responseText;
  // var temperatureData = JSON.parse(jsonString);
  // var jsonStringTemperature = JSON.stringify(temperatureData);
  localStorage.setItem('Weather data', jsonString);
}

var getWeatherData = function(){
  var jsonString = localStorage.getItem('Weather data');
  return JSON.parse(jsonString);
}


var formURL = function(id){
  return `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${apiKey}`;
}

var handleCitySelected = function(){
  let url = formURL(this.value)
  makeRequest(url, requestComplete);
  // console.log(getWeatherData());
  // console.log(formTemperatureArray());
  new LineChart(["jan", "feb", "mar"], formTemperatureArray());

}

var formTemperatureArray = function(){
  let weatherData = getWeatherData();
  let kelvinArray = weatherData.list.map(weather => weather.main.temp);
  return kelvinArray.map(kelvinString => Number((Number(kelvinString)-273.15).toFixed(2)));

}



var citiesArray = [
  {
    "id": 3333229,
    "name": "City of Edinburgh",
    "country": "GB",
    "coord": {
      "lon": -3.19333,
      "lat": 55.94973
    }
    },

    {
      "id": 3333231,
      "name": "Glasgow City",
      "country": "GB",
      "coord": {
        "lon": -4.25,
        "lat": 55.866669
      }
    },

    {
      "id": 3333248,
      "name": "City and County of Swansea",
      "country": "GB",
      "coord": {
        "lon": -4,
        "lat": 51.583328
      }
    },

    {
      "id": 2653822,
      "name": "Cardiff",
      "country": "GB",
      "coord": {
        "lon": -3.18,
        "lat": 51.48
      }
    },

    {
      "id": 2643744,
      "name": "City of London",
      "country": "GB",
      "coord": {
        "lon": -0.08901,
        "lat": 51.51334
      }
    },

    {
      "id": 2655603,
      "name": "Birmingham",
      "country": "GB",
      "coord": {
        "lon": -1.89983,
        "lat": 52.481419
      }
    }
]

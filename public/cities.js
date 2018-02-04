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

var formSecondCitiesDropDown = function(){

  var select = document.querySelector('#select-second-city');
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
  // console.log("this in makecomplete: ", this);
  request.send();
}

var requestComplete = function(){

  if (this.status !== 200) {return;}
  var jsonString = this.responseText;
  // var temperatureData = JSON.parse(jsonString);
  // var jsonStringTemperature = JSON.stringify(temperatureData);
  localStorage.setItem('Weather data', jsonString);
  let data = JSON.parse(jsonString);
  // console.log("this in requestcomplete: ", this);
  // return data;
  new LineChart(formDatesArray(data), getCityName(data),formTemperatureArray(data));
  formCityWeather(data);
}

var requestSecondComplete = function(){

  if (this.status !== 200) {return;}
  var jsonString = this.responseText;
  // var temperatureData = JSON.parse(jsonString);
  // var jsonStringTemperature = JSON.stringify(temperatureData);
  localStorage.setItem('Second weather data', jsonString);
  let data =  JSON.parse(jsonString);

  let oldData = getWeatherData();
  new LineChart(formDatesArray(oldData), getCityName(oldData), formTemperatureArray(oldData), getCityName(data), formSecondTemperatureArray(data));

  formSecondCityWeather(data);


  console.log(formWeatherDataDiv(data));



}

var getWeatherData = function(){
  var jsonString = localStorage.getItem('Weather data');
  return JSON.parse(jsonString);
}
var getSecondWeatherData = function(){
  var jsonString = localStorage.getItem('Second weather data');
  return JSON.parse(jsonString);
}


var formURL = function(id){
  return `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${apiKey}`;
}

var handleCitySelected = function(){
  let url = formURL(this.value)
  let weatherData = makeRequest(url, requestComplete);
  console.log(weatherData);
  // new LineChart(formDatesArray(), formTemperatureArray());

}

var handleSecondCitySelected = function(){
  let url = formURL(this.value);
  let weatherData = makeRequest(url, requestSecondComplete);
  // new LineChart(formDatesArray(), formTemperatureArray(), formSecondTemperatureArray());
}

var coordFromID = function(id){
  for(city of citiesArray){
    if(city.id = id){return city.coord;}
  }
}

var getCityName = function(weatherData){
  return weatherData.city.name;
}


var formTemperatureArray = function(weatherData){
  // let weatherData = getWeatherData();
  let kelvinArray = weatherData.list.map(weather => weather.main.temp);
  return kelvinArray.map(kelvinString => Number((Number(kelvinString)-273.15).toFixed(2)));
}

var formSecondTemperatureArray = function(weatherData){
  // let weatherData = getSecondWeatherData();
  let kelvinArray = weatherData.list.map(weather => weather.main.temp);
  return kelvinArray.map(kelvinString => Number((Number(kelvinString)-273.15).toFixed(2)));
}

var formDatesArray = function(weatherData){
  // let weatherData = getWeatherData();
  let dateArray = weatherData.list.map(weather => moment(weather.dt_txt).format('dddd HH:mm'));

  return dateArray.map(function(string){if(string.indexOf("00:00") != -1){return string}
  else{return string.slice(-5) }});
}

var formWeatherDataDiv = function(weatherData){
  let currentWeatherDiv = document.createElement('div');
  let pTag1 = document.createElement('p');
  pTag1.className = "city-weather-title";
  let pTag2 = document.createElement('p');
  let pTag3 = document.createElement('p');
  let pTag4 = document.createElement('p');
  pTag1.innerText = "Current Weather at " + weatherData.city.name;
  pTag2.innerText = "Weather conditions: "+ weatherData.list[0].weather[0].description;
  pTag3.innerText = "Temperature: " + Number((Number(weatherData.list[0].main.temp)-273.15).toFixed(2)) +'\xB0'+'C';
  pTag4.innerText = "Wind: " + weatherData.list[0].wind.speed + "m/s from "+getWindDirection(weatherData.list[0].wind.deg);
  currentWeatherDiv.appendChild(pTag1);
  currentWeatherDiv.appendChild(pTag2);
  currentWeatherDiv.appendChild(pTag3);
  currentWeatherDiv.appendChild(pTag4);
  return currentWeatherDiv;
}
var formCityWeather = function(weatherData){
  let div = document.querySelector('#city-weather');
  div.innerText = "";
  let weatherInfo = formWeatherDataDiv(weatherData);
  weatherInfo.className = "city-info";
  div.appendChild(weatherInfo);
}

var formSecondCityWeather = function(weatherData){
  let div = document.querySelector('#city-weather');
  div.innerText = "";
  let firstCityInfo = getWeatherData()
  let weatherFirstInfo = formWeatherDataDiv(firstCityInfo);
  let weatherInfo = formWeatherDataDiv(weatherData);
  weatherInfo.className = "city-info";
  weatherFirstInfo.className = "city-info";
  div.appendChild(weatherFirstInfo);
  div.appendChild(weatherInfo);
}

var getWindDirection = function(bearing){
  let bearingNumber = Number(bearing);
  if(bearing<22.5){return "N"}
  if (bearing<67.5){return "NE"}
  if (bearing<112.5){return "E"}
  if (bearing<157.5){return "SE"}
  if (bearing<202.5){return "S"}
  if (bearing<247.5){return "SW"}
  if (bearing<292.5){return "W"}
  if (bearing<337.5){return "NW"}
  if (bearing>337.5){return "N"}

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

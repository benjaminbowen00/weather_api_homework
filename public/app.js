

var app = function(){

formCitiesDropDown();

var select = document.querySelector('#select-city');
select.addEventListener('change', handleCitySelected);

}

window.addEventListener('load', app);

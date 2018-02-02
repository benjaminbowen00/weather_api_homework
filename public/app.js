// var createTopOption = function(){
//   var optionAtTop = document.createElement('option');
//   optionAtTop.innerText  = "Select a city"
//   optionAtTop.disabled = true;
//   optionAtTop.selected = true;
//   return optionAtTop;
// }
//
// var formCitiesDropDown = function(){
//
//   var select = document.querySelector('#select-city');
//   select.appendChild(createTopOption());
//   citiesArray.forEach(function(city){
//     var option = document.createElement('option');
//     option.innerText = city.name;
//     // option.value = index;
//     select.appendChild(option);
//   })
// }

var app = function(){
console.log("working");
formCitiesDropDown();
}

window.addEventListener('load', app);

var Map = function(container, coords, zoom) {

 this.googleMap = new google.maps.Map(container, {center:  coords,
    zoom: zoom
 });
 this.markers = [];
 this.secondMarker = [];

}


Map.prototype.addMarker = function(coords) {
  this.clearOverlays()
  // setMapOnAll(null);
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });

  this.markers.push(marker);
  // setMapOnAll(this.googleMap);
  return marker;

}

// Map.prototype.addInfoWindow(marker, message) {
//
//   var infoWindow = new google.maps.InfoWindow({
//     content: message
//   });
//
//   marker.infoWindow = infoWindow;
//
//   google.maps.event.addListener(marker, 'click', function () {
//     infoWindow.open(this.googleMap, marker);
//   });
// }

Map.prototype.clearOverlays = function() {
  this.clearSecondOverlays();
  for (var i = 0; i < this.markers.length; i++ ) {
    this.markers[i].setMap(null);
  }
  this.markers.length = 0;
}

Map.prototype.addSecondMarker = function(coords) {
  this.clearSecondOverlays()
  // setMapOnAll(null);
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });

  this.secondMarker.push(marker);
  return marker;
  // setMapOnAll(this.googleMap);

}

Map.prototype.clearSecondOverlays = function() {
  for (var i = 0; i < this.secondMarker.length; i++ ) {
    this.secondMarker[i].setMap(null);}

  this.secondMarker.length = 0;
}

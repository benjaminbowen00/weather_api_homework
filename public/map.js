var Map = function(container, coords, zoom) {

 this.googleMap = new google.maps.Map(container, {center:  coords,
    zoom: zoom
 });
 this.markers = [];

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

}

Map.prototype.clearOverlays = function() {
  for (var i = 0; i < this.markers.length; i++ ) {
    this.markers[i].setMap(null);
  }
  this.markers.length = 0;
}

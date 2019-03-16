function initMap() {
  // options for map
  var options = {
    zoom: 10,
    center: {
      lat: 51.5074, lng: -0.1278},
  }

  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

}

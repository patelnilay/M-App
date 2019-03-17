// initialises map. Gets called in API script tag
function initMap() {

  var infoWindow

  // options for map
  var options = {
    zoom: 10,
    center: {
      lat: 51.5074,
      lng: -0.1278
    },
  };

  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // add marker to map at Google Kings Cross
  var placeMarker = new google.maps.Marker({
    position: {
      lat: 51.53331,
      lng: -0.1260625
    },
    map: map
  });

  var informationWindow = new google.maps.InfoWindow({
    content: '<h1> Google Kings Cross </h2>',
  });

  placeMarker.addListener('click', function() {
    informationWindow.open(map, placeMarker);
  });

  let button = document.getElementById("get-location");
  console.log(button)

  button.onclick= function() {
    geoLocate(map, infoWindow);
  };

}

function geoLocate(map, infoWindow) {

  var infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

}

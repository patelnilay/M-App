var destinationPosition = {
  lat: 51.53331,
  lng: -0.1260625
}

var pos;


function initMap() {

  drawnMap = setupMap()
  setPlaceMarker(drawnMap);

  document.getElementById("get-location").onclick = function() {
    geoLocate(drawnMap);
  };

  getRouteDirections(drawnMap);
};


function setupMap(map) {

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
  return map
};


function setPlaceMarker(map) {

  // add marker to map at Google Kings Cross
  var placeMarker = new google.maps.Marker({
    position: destinationPosition,
    map: map
  });

  var informationWindow = new google.maps.InfoWindow({
    content: '<h3> <strong> Google Kings Cross </strong> </h3> <h5> 6 Pancras Square<br>London N1C 4AG<br>United Kingdom <br> Phone: +44-20-7031-3000</h5>',
  });

  placeMarker.addListener('click', function() {
    informationWindow.open(map, placeMarker);
  });


};

// funciton finds location of user
function geoLocate(map, infoWindow) {

  var infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation in browser.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      document.getElementById('get-route').disabled =false;
      console.log("SDASFSG")
      console.log(pos)

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      locationNotFound(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    locationNotFound(false, infoWindow, map.getCenter());
  }


  function locationNotFound(browserGotGeolocation, infoWindow, position) {
    infoWindow.setPosition(position);
    infoWindow.setContent(browserGotGeolocation ?
      'Error: The Geolocation service failed. Please refresh the page and enable location services.' :
      'Error: Your browser doesn\'t support geolocation. Try a different broswer');
    infoWindow.open(map);
  }

};

console.log(pos)

function getRouteDirections(map) {

  var displayDirections = new google.maps.DirectionsRenderer();
  var services = new google.maps.DirectionsService();
  displayDirections.setMap(map);

  document.getElementById('get-route').onclick = function() {
    document.getElementById("get-route").innerHTML = "Update";
    calculateRoute();
  };

  function calculateRoute() {


      var selectedTravelModel = document.getElementById('mode').value;
      var request = {
        origin: pos,
        destination: destinationPosition,
        travelMode: google.maps.TravelMode[selectedTravelModel]
      };

      if (request.travelMode == 'TRANSIT') {
        request = {
          origin: userPosition,
          destination: destinationPosition,
          travelMode: 'TRANSIT',
          transitOptions: {
            modes: ['BUS', 'RAIL'],
            routingPreference: 'FEWER_TRANSFERS'
          },
          unitSystem: google.maps.UnitSystem.METRIC
        }
      }

      services.route(request, function(result, status) {

        console.log(result, status);
        if (status == 'OK') {
          displayDirections.setDirections(result);
        } else {
          Alert("Something went wrong 🤔: Displaying directions to the destination. Check location services are on and please try again");
        };

      });
  }
}

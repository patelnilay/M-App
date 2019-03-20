/**
 *
 *   Google Project Challence - Google Maps API
 *   main.js
 *
 *   Created By Nilay Patel
 *
 */

// Initialise global variables final destination and user's position.
var finalDestinationPosition = {
  lat: 51.53331,
  lng: -0.1260625
}

var userPosition;
var selectedTravelModel = 'DRIVING';

// This function

function transportSelection(button){
  for (aButton of document.getElementById('transport-options').children){
    if (aButton.value != button.value){
      aButton.style.color="rgba(255,255,255, 0.6)"
      continue;
    }
  }
  selectedTravelModel = button.value
  button.style.color = "#f1c40f"


}

/**
 * @function initMap
 * @description This function intialises and configures the map. It gets called in the API request ("callback=initMap")
 */
function initMap() {

  // Initialises drawnMap variable which hold the map and calls setupMap function
  let drawnMap = setupMap()

  // Calls setPlaceMarker function which sets a marker on the final destination
  setPlaceMarker(drawnMap);

  // gets Get Location button from index and calls geoLocate function when the button is clicked.
  document.getElementById("get-location").onclick = function() {
    // function call to geoLocate()
    geoLocate(drawnMap);
  };

  // calls getRouteDirections function which finds and draws a route depending on selected travel mode.
  getRouteDirections(drawnMap);
};

/**
 * @function setupMap
 * @description Initialises map and provied initialising options returns the map.
 */
function setupMap() {

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
    position: finalDestinationPosition,
    map: map
  });

  var informationWindow = new google.maps.InfoWindow({
    content: '<h5> <strong> Google Kings Cross </strong> </h5> <h6> 6 Pancras Square<br>London N1C 4AG<br>United Kingdom <br> Phone: +44-20-7031-3000</h6>',
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
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      document.getElementById('get-route').disabled =false;
      console.log(userPosition)

      infoWindow.setPosition(userPosition);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(userPosition);
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


function getRouteDirections(map) {

  var displayDirections = new google.maps.DirectionsRenderer();
  var services = new google.maps.DirectionsService();
  displayDirections.setMap(map);

  document.getElementById('get-route').onclick = function() {
    document.getElementById("get-route").innerHTML = "Update";
    calculateRoute();
  };

  function calculateRoute() {



      var request = {
        origin: userPosition,
        destination: finalDestinationPosition,
        travelMode: google.maps.TravelMode[selectedTravelModel]
      };

      if (request.travelMode == 'TRANSIT') {
        request = {
          origin: userPosition,
          destination: finalDestinationPosition,
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

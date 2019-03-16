// initialises map. Gets called in API script tag
function initMap() {
  // options for map
  var options = {
    zoom: 10,
    center: {
      lat: 51.5074,lng: -0.1278},
  };

  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // add marker to map at Google Kings Cross
  var placeMarker = new google.maps.Marker({
    position: {
      lat: 51.53331, lng: -0.1260625},
    map: map
  });

  var informationWindow = new google.maps.InfoWindow({
    content: '<h1> Google Kings Cross </h2>',
  });

  placeMarker.addListener('click',function(){
    informationWindow.open(map, placeMarker);
  });
};

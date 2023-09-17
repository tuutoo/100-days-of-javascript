// Initialize the map
function initialize(pos) {
  var mapOptions = {
    // Initial zoom level
    zoom: 10,
    // Center coordinates for the map upon initialization
    center: new google.maps.LatLng(pos),
    // Type of map (ROADMAP, SATELLITE, HYBRID, TERRAIN)
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // Minimum zoom level of the map
    minZoom: 2
  };

  // Create a new map instance using the provided options
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Add a marker on the map at the user's location
  new google.maps.Marker({
    position: pos,
    map: map
  });
}

// Get the user's current location
function createGoogleMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Initialize the map using the user's location
        initialize(pos);
      },
      function () {
        // If unable to get the location, use the default location
        var defaultLocation = { lat: 39.9042, lng: 116.4074 }; // Beijing
        initialize(defaultLocation);
      }
    );
  } else {
    // If the browser does not support geolocation, use the default location
    var defaultLocation = { lat: 39.9042, lng: 116.4074 }; // Beijing
    initialize(defaultLocation);
  }
}

// Get the user location when the window finishes loading
window.onload = createGoogleMap;

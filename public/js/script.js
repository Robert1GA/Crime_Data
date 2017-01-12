var initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8829321, lng: -87.6455962},
    zoom: 10
  });

  // for each marker passed through, add it to the map with a popup
  var allMarkers = [];
  markers.forEach(function(marker) {
    console.log(marker);
    var position = new google.maps.LatLng(marker.lat, marker.lng);
    var googleMarker = new google.maps.Marker({
      position: position,
      title: marker.caseNum,
      map: map
    });
    allMarkers.push(googleMarker);


    // Bind a popup to the marker
    googleMarker.addListener('click', function() {
      var infoWindow = new google.maps.InfoWindow({
        content:
          '<p>'+ 'block: ' + marker.block + '</p>' +
          '<p>' + 'where: ' + marker.locationDesc + '</p>' +
          '<p>' + 'date: ' + marker.date + '</p>'

      });
      infoWindow.open(map, googleMarker);
    });
  });
  // Add a marker cluster to manage the markers
  var markerCluster = new MarkerClusterer(map, allMarkers,
    {imagePath: '/images/m',
    gridSize: 40,
    maxZoom: 12
   });
};

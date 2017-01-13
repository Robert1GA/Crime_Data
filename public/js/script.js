var map;
var chicago = {lat: 41.8829321, lng: -87.6455962};

function CenterControl(controlDiv, map, center) {
  var control = this;

  // Set the center property upon construction
  control.center_ = center;
  controlDiv.style.clear = 'both';

  // Set CSS for the control border
  var goCenterUI = document.createElement('div');
  goCenterUI.id = 'goCenterUI';
  goCenterUI.title = 'Click to recenter the map';
  controlDiv.appendChild(goCenterUI);

  // Set CSS for the control interior
  var goCenterText = document.createElement('div');
  goCenterText.id = 'goCenterText';
  goCenterText.innerHTML = 'Back to overview';
  goCenterUI.appendChild(goCenterText);

  // Set up the click event listener for 'Center Map': Set the center of
  // the map
  // to the current center of the control.
  goCenterUI.addEventListener('click', function() {
    var currentCenter = control.getCenter();
    map.setCenter(currentCenter);
    map.setZoom(10);
  });
};

  // Define a property to hold the center state.
  CenterControl.prototype.center_ = null;

  // Gets the map center.
  CenterControl.prototype.getCenter = function() {
  return this.center_;
  };

  // Sets the map center
  // CenterControl.prototype.setCenter = function(center) {
  // this.center_ = center;
  // };

var initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 10
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor
  // passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map, chicago);

  centerControlDiv.index = 1;
  centerControlDiv.style['padding-top'] = '10px';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


  // custom icons
  var icons = {
    homicide: {
      icon: '/images/homicide.png'
    }
  };

  // for each marker passed through, add it to the map with a popup
  var allMarkers = [];
  markers.forEach(function(marker) {
    console.log(marker);
    var position = new google.maps.LatLng(marker.lat, marker.lng);
    var googleMarker = new google.maps.Marker({
      position: position,
      icon: icons.homicide.icon,
      title: marker.caseNum,
      map: map
    });
    allMarkers.push(googleMarker);


    // Bind a popup to the marker
    googleMarker.addListener('click', function() {
      var infoWindow = new google.maps.InfoWindow({
        content:
          '<p>'+ 'BLOCK: ' + marker.block + '</p>' +
          '<p>' + 'LOCATION: ' + marker.locationDesc + '</p>' +
          '<p>' + 'DATE: ' + marker.date + '</p>'

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


//
// function findLocation() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 8,
//           center: {lat: 35.717, lng: 139.731}
//         });
//       }

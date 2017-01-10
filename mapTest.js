var geocoder = require('geocoder');
geocoder.geocode('Willis Tower', function(err, data) {
  console.log('THE RESULTS:', data.results[0].geometry.location);
});

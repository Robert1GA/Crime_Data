var request = require('request');
var cheerio = require('cheerio');

var URL = 'https://data.cityofchicago.org/Public-Safety/Crimes-2016/kf95-mnd6';

request(URL, function(err, response, body) {
  var $ = cheerio.load(body);
  var crimes = $(".blist-tr");
  console.log('crimes', crimes);
  
  crimes.each(function(index, crime) {
    var date = crime.find(".blist-t1-c2582288817");
    console.log('date:', date.textContent());
  });

});





  // var block = $('.blist-t1-c258138727');
  // var description = $('.blist-t1-c258138730');
  // var domestic = $('.blist-t1-c258138733');
  // var xCoord = $('.blist-t1-c258138739');
  // var yCoord = $('.blist-t1-c258138740');
  // var latitude = $('.blist-t1-c258138743');
  // var longitude = $('.blist-t1-c258138744');
  //
  // console.log(date.text());
  // console.log(block.text());
  // console.log(description.text());
  // console.log(domestic.text());
  // console.log(xCoord.text());
  // console.log(yCoord.text());
  // console.log(latitude.text());
  // console.log(longitude.text());

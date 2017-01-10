var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var app = express();

// Find all crime
router.get('/', function (req, res) {
  var chicagoCrimeUrl = 'http://api1.chicagopolice.org/clearpath/api/1.0/crimes/list?dateOccurred=12-31-2016&max=10';

  request(chicagoCrimeUrl, function(error, response, body) {
    var crimeStat = JSON.parse(body);
    res.render('crime/allstats', {crimeStat: crimeStat});
  });
});

module.exports = router;

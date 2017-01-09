var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);

app.get('/', function (req, res) {
  var chicagoCrimeUrl = 'http://api1.chicagopolice.org/clearpath/api/1.0/crimes/list?dateOccurred=12-31-2016&max=10';

  request(chicagoCrimeUrl, function(error, response, body) {
    var crimeStat = JSON.parse(body);
    res.render('index', {crimeStat: crimeStat});
  });
});

app.use('/crime', require('./controllers/crime'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

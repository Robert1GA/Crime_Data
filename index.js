require('dotenv').config();
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var app = express();

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET || 'passwordyouwillnevereverguess',
  resave: false,  // won't save if there are no changes
  saveUninitialized: true, // save if this is a new session never saved
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function (req, res) {
  var chicagoCrimeUrl = 'http://api1.chicagopolice.org/clearpath/api/1.0/crimes/list?dateOccurred=12-31-2016&max=10';

  request(chicagoCrimeUrl, function(error, response, body) {
    var crimeStat = JSON.parse(body);
    res.render('index', {crimeStat: crimeStat});
  });
});

app.use('/crime', require('./controllers/crime'));

var server = app.listen(process.env.PORT || 3001);

module.exports = server;

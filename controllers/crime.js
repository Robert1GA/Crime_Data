require('dotenv').config();
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var app = express();

router.get('/', isLoggedIn, function(req, res) {
  res.render('crime/main')
});


// Find all homicides
router.get('/show', isLoggedIn, function(req, res) {
  db.homicide.findAll({
    include: [db.lucr]
  }).then(function(homicides) {
    req.user.getAddresses().then(function(addresses) {
      res.render('crime/show', {
        homicides: homicides,
        addresses: addresses
      });
    })
  }).catch(function(err) {
    res.send({ message: 'error', error: err});
  });
});

router.post('/address', function(req, res) {
  db.address.findOrCreate({
    where: {
      name: req.body.name || req.body.address,
      address: req.body.address + ' Chicago'},
    include: [db.user]
  }).spread(function(address, wasCreated) {
    req.user.addAddress(address).then(function(user) {
      console.log("user:", user);
      res.redirect('/crime/show');
    });
  }, function() {
    res.redirect('/crime/show');
  });
});


router.get('/:name', function(req, res) {
  console.log('name', req.params.name)
  db.homicide.find({
    where: { caseNum: req.params.name },
    include: [db.lucr]
  })
  .then(function(homicide) {
    console.log('hello');
    if (!homicide) throw Error();
    res.send('here you are');
  })
  .catch(function(err) {
    res.send({ message: 'error', error: err});
  });
});

module.exports = router;

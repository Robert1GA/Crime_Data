var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var app = express();

// Find all homicides
router.get('/', function(req, res) {
  db.homicide.findAll({
  }).then(function(homicides) {
    res.render('crime/show', {homicides: homicides});
  }).catch(function(err) {
    res.send({ message: 'error', error: err});
  });
});

router.post('/address', function(req, res) {
  db.homicide.findAll({

  }).then(function(homicides) {
    name = req.body.name;
    address = req.body.address + ' Chicago';
    console.log('name:', name);
    console.log('address:', address);
    res.render('crime/show', {
      homicides: homicides,
      name: name,
      address: address
    })
  });
});


// router.post('/address', function(req, res) {
//   db.address.create({
//     name: req.body.name,
//     address: req.body.address
//   }).then(function(address) {
//     res.redirect('/crime');
//   }).catch(function(err) {
//     res.send({message: 'error', error: err});
//   });
// });

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var app = express();

// Find all crime
router.get('/', function(req, res) {
  db.homicide.findAll().then(function(homicides) {
    res.render('crime/show', {homicides: homicides});
  }).catch(function(err) {
    res.send({ message: 'error', error: err});
  });
});

router.get('/test', function(req, res) {
  db.lucr.findAll({
    include: [db.homicide]
  }).then(function(lucrs) {
    console.log(lucr.homicides);
  })
})

router.post('/address', function(req, res) {
  db.address.create({
    name: req.body.name,
    address: req.body.address
  }).then(function(address) {
    res.redirect('/crime');
  }).catch(function(err) {
    res.send({message: 'error', error: err});
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var app = express();

// Find all crime
router.get('/', function(req, res) {
  db.address.findAll().then(function(addresses) {
    res.render('crime/show', {addresses: addresses});
  }).catch(function(err) {
    res.send({ message: 'error', error: err});
  });
});

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

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
    include: [db.lucr]
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
  .catch(function(error) {
    res.send({ message: 'error', error: error});
  });
});

module.exports = router;

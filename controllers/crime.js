require('dotenv').config();
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
// var isLoggedIn = require('../middleware/isLoggedIn');
var app = express();


// Find all homicides
// router.get('/show', isLoggedIn, function(req, res) {
//   db.homicide.findAll({
//
//   }).then(function(homicides) {
//     req.user.getAddresses().then(function(addresses) {
//       res.render('crime/show', {
//         homicides: homicides,
//         addresses: addresses
//       });
//     })
//     console.log('db complete');
//   }).catch(function(error) {
//     console.log(error);
//     res.status(400).render('general/404');
//   });
// });

router.get('/show', function(req, res) {
  db.homicide.findAll()
  .then(function(homicides) {
    res.render('crime/show', {homicides: homicides})
  })
  .catch(function(error) {
    res.status(400).render('general/404');
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
      res.redirect('/crime/show');
    });
  }, function() {
    res.redirect('/crime/show');
  });
});


router.get('/:name', function(req, res) {
  db.homicide.find({
    where: { caseNum: req.params.name },
    include: [db.lucr]
  })
  .then(function(homicide) {
    if (!homicide) throw Error();
    res.send('here you are');
  }).catch(function(error) {
    res.status(400).render('general/404');
  });
});

module.exports = router;

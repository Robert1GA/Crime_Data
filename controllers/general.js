require('dotenv').config();
var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var app = express();

router.get('/faq', function(req, res) {
  res.render('general/faq');
});

router.get('/profile', isLoggedIn, function(req, res) {
  db.user.find({
    where: {email: req.user.email},
    include: [db.address]
  }).then(function(user) {
    res.render('general/profile', {
      user: user
    });
  }).catch(function(error) {
    res.status(400).render('general/404');
  });
});

// page to edit existing address
router.get('/address/:id/edit',function(req, res) {
  db.address.find({
    where: {id: req.params.id}
  }).then(function(addresses, users) {
    res.render('general/edit', {
      addresses: addresses
    });
  }).catch(function(error) {
    res.status(400).render('general/404');
  });
});

// submit the edit on the address
app.put('/address/:id', function(req, res) {
  db.address.update(req.body,
  {where: {id: req.params.id}}).then(function(addresses) {
    res.send({message: 'edit success'});
  }).catch(function(error) {
    res.status(400).render('general/404');
  });
});

// delete an address
router.delete('/address/:id', function(req, res) {
  db.address.findById(req.params.id).then(function(addresses) {
    addresses.destroy();
    res.send({message: 'deleted'});
  });
});

module.exports = router;

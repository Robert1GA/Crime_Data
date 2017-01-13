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
  res.send('faq page');
})


router.get('/profile', function(req, res) {
  console.log(req.user.email);
  db.user.find({
    where: {email: req.user.email},
    include: [db.address]
  }).then(function(user) {
    res.render('general/profile', {
      user: user
    });
  }).catch(function(err) {
    res.send({ message: 'error', error: err});
  });
});

router.put('/address/:id', function(req, res) {
  db.address.update(req.body,
  {where: {id: req.params.id}}).then(function(addresses) {
    res.send({message: 'edit success'});
  });
});

// delete an address
router.delete('/address/:id', function(req, res) {
  console.log('REQ',req.params.id);
  db.address.findById(req.params.id).then(function(addresses) {
    addresses.destroy();
    res.send({message: 'deleted'});
  });
});

module.exports = router;

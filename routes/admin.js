var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var Material = require('../models/Material.js');
var Printer = require('../models/Printer.js');
var Order = require('../models/Order.js');
var Busboy = require('busboy');
var fs = require("fs");
var lwip = require('lwip');
var path = require('path');
var Imagemin = require('imagemin');
var rimraf = require('rimraf');

passport.use('local', new LocalStrategy(
  function(username, password, done) {
      if (username === "admin" && password === "000000") {
          return done(null, 'admin');
      } else {
          return done(null, false, { message: 'Incorrect credentials' });
      }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  req.isAuthenticated() ? res.render('admin/admin', { user: req.user }) : res.redirect('/admin/login');
});

router.get('/materials', function(req, res, next) {
    Material.find({}, function(err, materials) {
      if (!err) {
        req.isAuthenticated() ? res.render('admin/materials', { materials: materials }) : res.redirect('/admin/login');
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.get('/orders', function(req, res, next) {
    Order.find({}, function(err, orders) {
      if (!err) {
        req.isAuthenticated() ? res.render('admin/orders', { orders: orders }) : res.redirect('/admin/login');
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});


router.get('/printers', function(req, res, next) {
    Printer.find({}, function(err, printers) {
      if (!err) {
        req.isAuthenticated() ? res.render('admin/printers', { printers: printers }) : res.redirect('/admin/login');
      } else {
        console.log('error:');
        console.log(err);
      }
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('authenticated');
  console.log('user: ' + req.user);
  res.redirect('/admin');
  res.end();
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
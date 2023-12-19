var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Home', base_url: process.env.base_url });
});

router.get('/packages', function(req, res, next) {
  res.render('packages.ejs', { title: 'Home', base_url: process.env.base_url });
});

// ----destination------------------//
router.get('/destination', function(req, res, next) {
  res.render('destination.ejs', { title: 'Destination', base_url: process.env.base_url });
});

// ----services------------------//
router.get('/services', function(req, res, next) {
  res.render('services.ejs', { title: 'Services', base_url: process.env.base_url });
});

// ----services------------------//
router.get('/about', function(req, res, next) {
  res.render('about.ejs', { title: 'About-Us', base_url: process.env.base_url });
});

// ---details.ejs------------//
router.get('/packages-details', function(req, res, next) {
  res.render('details.ejs', { title: 'Packages', base_url: process.env.base_url });
});


// ----contact------------------//
router.get('/contact', function(req, res, next) {
  res.render('contact.ejs', { title: 'Contact-Us', base_url: process.env.base_url });
});

// ------login----------------------//
router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'Login', base_url: process.env.base_url });
});

// -----dashboard--------------------//
router.get('/dashboard', function(req, res, next) {
  res.render('admin/dashboard', { title: 'Dashboard', base_url: process.env.base_url });
});


// ----------addLocation.ejs-------------------//
router.get('/add-location', function(req, res, next) {
  res.render('admin/addLocation', { title: 'Add-Location', base_url: process.env.base_url });
});

// -----addPackages.ejs----------------------//
router.get('/add-packages', function(req, res, next) {
  res.render('admin/addPackages', { title: 'Add-Packages', base_url: process.env.base_url });
});

// ----addServices.ejs----------------------//
router.get('/add-services', function(req, res, next) {
  res.render('admin/addServices', { title: 'Add-Services', base_url: process.env.base_url });
});

// -----destination.ejs-------------//
router.get('/add-destination', function(req, res, next) {
  res.render('admin/destination', { title: 'Add-Destination', base_url: process.env.base_url });
});






module.exports = router;

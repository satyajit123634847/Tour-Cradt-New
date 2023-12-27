var express = require('express');
var router = express.Router();
var adminController = require("../controller/admin/adminController")
var auth = require("../helper/auth")
var uploadHelper = require("../helper/upload_helper")



const jwt = require('jsonwebtoken');
const User = require('../model/admin/adminUser.model');




// ------register admin --------------------//
router.post('/register', adminController.register);

// ------login --------------------------//
router.post('/login', adminController.login);

router.get('/profile', auth.auth, (req, res) => {
    res.send(req.user);
});

// -----list_admin------------------------//
router.get('/list_admin', adminController.list_admin);

// ------update_admin----------------------//
router.put('/update_admin/:id', adminController.update_admin);

// ---------delete_admin---------------------//
router.put('/delete_admin/:id', adminController.delete_admin);

// ---------list_admin_by_role--------------------------/
router.get('/list_admin_by_role/:id', adminController.list_admin_by_role);

// ------reset_password---------//
router.post('/reset_password', adminController.reset_password);

// ------add_location---------//
router.post('/add_location', adminController.add_location);

// ------list_location---------//
router.get('/list_location', adminController.list_location);

// ------update_location---------//
router.put('/update_location/:id', adminController.update_location);

// ------delete_location---------//
router.put('/delete_location/:id', adminController.delete_location);

// ------list_location_admin---------//
router.get('/list_location_admin', adminController.list_location_admin);

// ------list_location_by_country---------//
router.get('/list_location_by_country', adminController.list_location_by_country);

// ------add_packages---------//
router.post('/add_packages', adminController.add_packages);

// ------list_packages---------//
router.get('/list_packages', adminController.list_packages);

// ----list_packages_by_name----/
router.get('/list_packages_by_name/:name', adminController.list_packages_by_name);


// ------update_packages---------//
router.put('/update_packages/:id', adminController.update_packages);

// ------delete_packages---------//
router.put('/delete_packages/:id', adminController.delete_packages);

// ------list_packages_admin---------//
router.get('/list_packages_admin', adminController.list_packages_admin);

//-------filter_packages---------//
router.post('/filter_packages', adminController.filter_packages);

// -----list_packages_country-------//
router.get('/list_packages_country/:name', adminController.list_packages_country);


router.get('/send_msg', adminController.send_msg);



router.get('/getNearbyLocations', adminController.getNearbyLocations);




// ------add_services---------//
router.post('/add_services', adminController.add_services);

// ------list_services---------//
router.get('/list_services', adminController.list_services);

// ------update_services---------//
router.put('/update_services/:id', adminController.update_services);

// ------delete_services---------//
router.put('/delete_services/:id', adminController.delete_services);

// ------list_services_admin---------//
router.get('/list_services_admin', adminController.list_services_admin);




// ------add_destination---------//
router.post('/add_destination', adminController.add_destination);

// ------list_destination---------//
router.get('/list_destination', adminController.list_destination);

// ------update_destination---------//
router.put('/update_destination/:id', adminController.update_destination);

// ------delete_destination---------//
router.put('/delete_destination/:id', adminController.delete_destination);

// ------list_destination_admin---------//
router.get('/list_destination_admin', adminController.list_destination_admin);






router.post("/upload-files", uploadHelper.upload_files, async (req, res) => {
    return res.json({
        status: true,
        "url": req.files
    })
})






module.exports = router;

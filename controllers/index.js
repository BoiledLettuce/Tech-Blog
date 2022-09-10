const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const homepageControl = require('./homepageControl.js');
const dashboardControl = require('./dashboardControl.js');


router.use('/api', apiRoutes);
router.use('/', homepageControl);
router.use('/dashboard', dashboardControl);
router.use((req, res) => { res.send("<h1>SPECIFY A ROUTE</h1>") });


module.exports = router;
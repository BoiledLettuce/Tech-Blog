const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const homepageControl = require('./homepageControl.js');
const dashboardControl = require('./dashboardControl.js');


router.use('/api', apiRoutes);
router.use('/homepage', homepageControl);
router.use('/dashboard', dashboardControl);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
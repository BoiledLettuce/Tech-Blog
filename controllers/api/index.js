const express = require('express');
const router = express.Router();
const commentRoute = require('./commentControl');
const forumRoute = require('./forumControl');
const userRoute = require('./userControl');

router.use('/comments', commentRoute);
router.use('/forums', forumRoute);
router.use('/users', userRoute);

module.exports = router;
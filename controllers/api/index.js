const router = require('express').Router();
const commentRoute = ('./commentControl');
const forumRoute = ('./forumControl');
const userRoute = ('./userControl');

router.use('/comments', commentRoute);
router.use('/forums', forumRoute);
router.use('/users', userRoute);

module.exports = router;
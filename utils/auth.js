const wAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        console.log('logged in');
        next();
    }
};

module.exports = wAuth;
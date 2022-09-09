const router = require('express').Router();
const sequelize = require('../config/connection');
const { Forum, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Forum.findAll({
        attributes: ['id', 'title', 'created_at', 'forum_content'],
        include: [{ model: Comment, attributes: ['id', 'comment_content', 'forum_id', 'user_id', 'created_at'], 
        include: { model: User, attributes: ['username'] } }, { model: User, attributes: ['username'] }]
    })
        .then(dbForumData => {
            const forums = dbForumData.map(forum => forum.get({ plain: true }));
            res.render('homepage', { forums, loggedIn: req.sessionID.loggedIn });
        })
        .catch(err => { if (err) throw err;  res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/forum/:id', (req, res) => {
    Forum.findOne({
        where: { id: req.params.id },
        attributes: [
            'id',
            'title',
            'created_at',
            'comment_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'forum_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbForumData => {
            if (!dbForumData) {
                res.status(404).json({ message: 'Does not exist' });
                return;
            }
             const forum = dbForumData.get({ plain: true });

             res.render('singleForum', {
                forum,
                loggedIn: req.session.loggedIn
             });
        })
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        });
});

module.exports = router;
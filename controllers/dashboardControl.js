const router = require('express').Router();
const connection = require('../config/connection');
const { Forum, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Forum.findAll({
      where: { user_id: req.session.user_id },
      attributes: [ 'id', 'title', 'date_created', 'Forum_content' ],
      include: [ {
          model: Comment,
          attributes: ['id', 'comment_content', 'Forum_id', 'user_id', 'date_created'],
          include: { model: User, attributes: [ 'username' ] }
        },
        { model: User, attributes: ['username'] }
      ]
    })
      .then(dbForumData => { const Forums = dbForumData.map(Forum => Forum.get({ plain: true }));
        res.render('dashboard', { Forums, loggedIn: true });
      })
      .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
      });
  });
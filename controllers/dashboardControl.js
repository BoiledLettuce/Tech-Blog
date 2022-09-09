const router = require('express').Router();
const connection = require('../config/connection');
const { Forum, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Forum.findAll({
      where: { user_id: req.session.user_id },
      attributes: [ 'id', 'title', 'created_at', 'forum_content' ],
      include: [ { model: Comment, attributes: ['id', 'comment_content', 'forum_id', 'user_id', 'created_at'], 
      include: { model: User, attributes: [ 'username' ] } },  { model: User, attributes: ['username'] } ]
    })
      .then(dbForumData => { const Forums = dbForumData.map(Forum => Forum.get({ plain: true }));
        res.render('dashboard', { Forums, loggedIn: true });
      })
      .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', (req, res) => {
    Forum.findOne({
      where: { id: req.params.id },
      attributes: [ 'id', 'title', 'created_at', 'forum_content' ],
      include: [ {  model: Comment, attributes: ['id', 'comment_text', 'forum_id', 'user_id', 'created_at'],
      include: { model: User, attributes: ['username'] } }, { model: User, attributes: ['username'] } ]
    })
      .then(dbForumData => {
        if (!dbForumData) { res.status(404).json({ message: 'Forum does not exist' }); return; }
        const Forum = dbForumData.get({ plain: true });
        res.render('editForum', { Forum, loggedIn: true });
      })
      .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
      });
});

router.get('/create/', (req, res) => {
  Forum.findAll({
    where: { user_id: req.session.user_id },
    attributes: [ 'id', 'title', 'created_at', 'forum_content' ],
    include: [ {  model: Comment, attributes: ['id', 'comment_text', 'Forum_id', 'user_id', 'created_at'],
    include: { model: User, attributes: ['username'] } }, { model: User, attributes: ['username'] } ]
  })
    .then(dbForumData => {
      const Forums = dbForumData.map(Forum => Forum.get({ plain: true }));
      res.render('createForum', { Forums, loggedIn: true });
    })
    .catch(err => {
      if (err) throw err;
      res.status(500).json(err);
    });
});

module.exports = router;
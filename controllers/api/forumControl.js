const router = require('express').Router();
const { Forum, User, Comment } = require('../../models');
const wAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Forum.findAll({
        attributes: [ 'id', 'title', 'date_created', 'forum_content' ],
        order: [['date_created']],
        include: [ { model: Comment, attributes: ['id', 'comment_content', 'forum_id', 'user_id', 'date_created'], include: { model: User, attributes: [ 'username' ] } },
            { model: User, attributes: ['username'] }, ]
    })
    .then(dbForumData => res.json(dbForumData))
    .catch(err => { if (err) throw err; res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Forum.findOne({
        where: { id: req.params.id },
        attributes: [ 'id', 'title','date_created', 'forum_content' ],
        include: [ {  model: User,  attributes: ['username'] }, { model: Comment, attributes: ['id', 'comment_content', 'forum_id', 'user_id', 'date_created'],
        include: { model: User, attributes: ['username'] } } ]
    })
    .then(dbAlbumData => {
        if (!dbForumData) { res.status(404).json({ message: 'forum does not exist'}); return; }
        res.json(dbForumData);
    })
    .catch(err => { if (err) throw err; res.status(500).json(err);
    });
});

router.post('/', wAuth, (req, res) => {
    Forum.create({
        title: req.body.title,
        forum_content: req.body.forum_content,
        user_id: req.sessionID.user_id
    })
    .then(dbForumData => res.json(dbForumData))
    .catch(err => { if (err) throw err; res.status(500).json(err);
    });
});

router.put('/:id', wAuth, (req, res) => {
    Forum.update({ title: req.body.title, forum_content: req.body.forum_content },
    { where: { id: req.params.id } } )
    .then(dbForumData => {
        if (!dbForumData) { res.status(404).json({ message: 'no forum exist'}); return; }
        res.json(dbForumData);
    })
    .catch(err => {
        if (err) throw err; res.status(500).json(err);
    });
});

router.delete('/:id', wAuth, (req, res) => {
    Forum.delete({
        where: {
            id: req.params.id
        }
    })
    .then(dbForumData => {
        if(!dbForumData) {
        res.status(404).json({ message: 'no forum exists'});
        return;
        }
        res.json(dbForumData);
    })
    .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
    });
});

module.exports = router;
const router = require('express').Router();
const { Comment } = require('../../models');
const wAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
    });
});

router.post('/', wAuth, (req, res) => {
    if (req.session) {
        Comment.create({ comment_content: req.body.comment_content,
                         forum_id: req.body.forum_id,
                         user_id: req.session.user_id, })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => { if (err) throw err; res.status(404).json(err); }); }
});

router.delete('/:id', wAuth, (req, res) => {
    Comment.delete({
        where: { id: req.params.id }
    })
    .then(dbCommentData => {
        if (!dbCommentData) { res.status(404).json({ message: 'no comment'});return; }
        res.json(dbCommentData);
    })
    .catch( err => { if (err) throw err; res.status(500).json(err);
    });
});

module.exports = router;
const router = require('express').Router();
const { User, Forum, Comment } = require('../../models');
const wAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Forum,
                attributes: ['id', 'title', 'forum_content', 'date_created']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'date_created'],
                include: {
                    model: Album,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'user does not exist' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username:
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'user does not exist' });
            return;
        }
        const authPassword = dbUserData.checkPassword(req.body.password);

        if (!authPassword) {
            res.status(400).json({ message: 'Wrong password...'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.user_id;
            req.session.logginIn = true;

            res.json({ user: dbUserData, message: 'You got logged!'});
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', wAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'user does not exist'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
    });
});

router.delete('/:id', wAuth, (req, res) => {
    User.delete({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'user does not exist' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        if (err) throw err;
        res.status(500).json(err);
    });
}); 

module.exports = router;
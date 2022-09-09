const { Forum, User } = require('../models');

const forumData = [
    {
        forum_content: 'butt',
    },
];

const seedForum = () => User.bulkCreate(forumData);

module.exports = seedForum;
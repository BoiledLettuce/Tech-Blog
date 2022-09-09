const { Forum, User } = require('../models');

const forumData = [
    {
        id: '1',
        title: 'forum',
        // date_created: '1.1.10',
        forum_content: 'butt',
    },
];

const seedForum = () => Forum.bulkCreate(forumData);

module.exports = seedForum;
const { User } = require('../models');

const userData = [
    {
        username: 'butt',
        password: 'butt',
        email: 'butt@butt.com',
    },
    {
        username: 'butt',
        password: 'butt',
        email: 'butt@butt.com',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
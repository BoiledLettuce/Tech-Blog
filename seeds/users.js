const { User } = require('../models');

const userData = [
    {
        username: 'butt',
        password: 'butt',
        email: 'butt',
    },
    {
        username: 'butt',
        password: 'butt',
        email: 'butt',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
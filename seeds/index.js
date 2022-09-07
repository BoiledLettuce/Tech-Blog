const seedForum = require('./forum-seeds');
const {User} = require('../models');
const sequelize = require('../config/connection');
const seedR = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
        individualHooks: true,
    });
    process.exit(0);
};

(async () => {
    await seedR();
})();
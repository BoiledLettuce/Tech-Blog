const seedForum = require('./forum');
const seedUser = require('./users');
// const { User } = require('../models');
const sequelize = require('../config/connection');





const seedR = async () => {
    await sequelize.sync({ force: true });

    await seedUser();
    console.log('\n----- USER SEED -----\n');

    await seedForum();
    console.log('\n----- FORUM SEED -----\n');

    // await User.bulkCreate(users, {  individualHooks: true, });

    process.exit(0);
};

seedR();


// (async () => {
//     await seedR();
// })();
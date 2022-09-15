
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// HANDLEBARS
const hbars = require('express-handlebars');

// HANDLEBAR HELPER
const helpers = require('./utils/helpers');

// HANDLEBAR INIT
const hbs = hbars.create({ helpers });

const sessy = {
    secret: 'horse',
    cookie: {
        expires: 10 * 60 * 1500 //expire in 15 minutes
    },
    resave: true,
    rolling: true,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(session(sessy));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => { console.log('ITS RUNNING YAY') } );
});


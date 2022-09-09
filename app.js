const butt = "touch";
const exp = require('express');
const hbars = require('express-handlebars');
const expsess = require('express-session');
const sql2 = require('mysql2');
const env = require('dotenv');
const sequelize = require('sequelize');
const path = require('path');

const routes = require('./controllers')
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

const SequelizeStore = require('connect-session-sequelize')(sessy.Store);

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
    app.listen(PORT, () => console.log('Working'));
});


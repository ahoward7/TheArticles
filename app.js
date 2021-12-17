const express = require('express');
const cookieParser = require("cookie-parser");
const session = require('express-session');

const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const articleRoutes = require('./routes/articleRoutes');
const Article = require('./views/components/article');

const app = express();

const uri = 'mongodb+srv://ahoward:AveryMongoDB@averymongo.klwhe.mongodb.net/AveryMongo?retryWrites=true&w=majority';
mongoose.connect(uri ,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connnected to db"))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000
app.listen(port);

app.use(express.static('public'));
app.use(express.urlencoded( { extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    if (!req.session.login) {
        req.session.login = false;
    }
    
    Article.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'Home', articles: result , css: 'index' , loggedIn: req.session.login })
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/about', (req, res) => {
    Article.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('about', { title: 'About', articles: result, css: 'about', loggedIn: req.session.login  });

        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/contact', (req, res) => {
    Article.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('contact', { title: 'Contact', articles: result, css: 'contact', loggedIn: req.session.login  });

        })
        .catch((err) => {
            console.log(err);
        });
});

app.use('/articles', articleRoutes);

app.use((req, res) => {
    res.render('404', { title: '404', css: '404'})
});
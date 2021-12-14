const Article = require('../views/components/article');

const article_index = (req, res) => {
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
}

const article_body = (req, res) => {
    const id = req.params.id;
    var a;

    Article.findById(id)
        .then(result => {
            a = result;
            Article.find().sort({ createdAt: -1})
            .then((result) => {
                res.render('article', { article: a, articles: result, title: result.title, css: 'article', loggedIn: req.session.login });
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

const article_create_get = (req, res) => {
    Article.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('create', { title: 'Create an Article' , articles: result, css: 'create', loggedIn: req.session.login  })
        })
        .catch((err) => {
            console.log(err);
        });
}

const article_create_postForm = (req, res) => {
    if (req.body.password == "Hello") {
        req.session.login = true;
    }

    if (req.session.login == true) {
        Article.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('create', { title: 'Create an Article' , articles: result, css: 'create', loggedIn: req.session.login })
        })
        .catch((err) => {
            console.log(err);
        });
    }
    else {
        res.redirect('/articles')
    }
}

const article_create_post = (req, res) => {
    const article = new Article(req.body);
    article.save()
        .then((result) => {
            res.redirect('/articles')
        });
}

const article_delete = (req, res) => {
    const id = req.params.id;

    Article.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/articles' })
        })
        .catch(err => {
            console.log(err)
        });
}

module.exports = {
    article_index,
    article_body,
    article_create_get,
    article_create_postForm,
    article_create_post,
    article_delete,
}
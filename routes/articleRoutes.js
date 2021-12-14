const express = require('express');
const articleController = require('../controllers/articleController')

const bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.get('/create', articleController.article_create_get);

router.post('/create', parser, articleController.article_create_postForm);

router.get('/', articleController.article_index), {loggedIn: "false"};

router.post('/', articleController.article_create_post);

router.get('/:id', articleController.article_body);

router.delete('/:id', articleController.article_delete);

module.exports = router;
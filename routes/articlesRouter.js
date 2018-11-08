const articlesRouter = require('express').Router();
const { getArticles, getArticleByID, getCommentsForArticle } = require('../controllers/articles')


articlesRouter.route('')
    .get(getArticles);
articlesRouter.route('/:article_id')
    .get(getArticleByID);
articlesRouter.route('/:article_id/comments')
    .get(getCommentsForArticle);

module.exports = articlesRouter;
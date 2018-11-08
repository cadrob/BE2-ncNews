const articlesRouter = require('express').Router();
const { getArticles, getArticleByID, getCommentsForArticle, addCommentToArticle, updateArticleVotes } = require('../controllers/articles')


articlesRouter.route('')
    .get(getArticles);
articlesRouter.route('/:article_id')
    .get(getArticleByID).patch(updateArticleVotes)
articlesRouter.route('/:article_id/comments')
    .get(getCommentsForArticle).post(addCommentToArticle);

module.exports = articlesRouter;
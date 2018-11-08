const topicsRouter = require('express').Router();
const { getTopics, getArticlesByTopic, addArticleToTopic } = require('../controllers/topics')


topicsRouter.route('')
    .get(getTopics);

topicsRouter.route('/:topic_slug/articles')
.get(getArticlesByTopic)
.post(addArticleToTopic)

module.exports = topicsRouter;

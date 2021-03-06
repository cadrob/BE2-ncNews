const { Topic, Article } = require ('../models');
const { commentCount } = require('../utils');

const getTopics = (req, res, next) => {
    Topic.find()
    .then((topics) => {
        res.status(200).send({topics})
    })
    .catch(next)
}

const getArticlesByTopic = (req, res ,next) => {
const { topic_slug } = req.params;

Article.find({belongs_to: topic_slug})
.then((articles) => {
    if (!articles.length){
        return Promise.reject({ status: 400, msg: `---${topic_slug}--- is not a valid topic` })
    }
    else {  
        return Promise.all(articles.map(article => commentCount(article)))
    }
}).then((articles) => {
    res.status(200).send(articles)
}).catch(next)
   
}

const addArticleToTopic = (req, res, next) => {
    const { title, body, created_by } = req.body;
    const { topic_slug } = req.params;
   
    article = new Article({ title, body, created_by, belongs_to: topic_slug})
    article.save()
    .then((article) => {
          res.status(201).send({ article })
        })
    .catch(next)
    }

module.exports = { getTopics, getArticlesByTopic, addArticleToTopic }
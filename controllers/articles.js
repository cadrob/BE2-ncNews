const { Article } = require ('../models');

const getArticles = (req, res, next) => {
    Article.find()
    .then((articles) => {
        res.status(200).send({articles})
    })
}

const getArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    console.log(article_id)
    Article.find({_id: article_id })
        .then((article) => {
            res.status(200).send({article})
        }).catch(next)
}

module.exports = { getArticles, getArticleByID }
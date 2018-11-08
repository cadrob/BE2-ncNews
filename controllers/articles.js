const { Article, Comment } = require ('../models');

const getArticles = (req, res, next) => {
    Article.find()
    .then((articles) => {
        res.status(200).send({articles})
    })
}

const getArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    Article.find({_id: article_id })
        .then((article) => {
            res.status(200).send({article})
        }).catch(next)
}

const getCommentsForArticle = (req, res, next) => {
//get the article id,
//search the comment docs that match that articleid and return

const { article_id } = req.params;
Comment.find({belongs_to: article_id})
.then((comments) => {
    res.status(200).send({comments})
}).catch(next)

}

module.exports = { getArticles, getArticleByID, getArticleByID, getCommentsForArticle }
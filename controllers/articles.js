const { Article, Comment } = require ('../models');
const { commentCount } = require('../utils');

const getArticles = (req, res, next) => {
    Article.find()
    .populate('created_by')
    .then((articles) => {
        return Promise.all(articles.map(article => commentCount(article)))
 })
 .then((articles) => {
     res.status(200).send(articles)
 })
 .catch(next)
}

const getArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    Article.findOne({_id: article_id })
    .populate('created_by')
        .then((article) => {
            if (!article){
                return Promise.reject({ status: 404, msg: `Article does not exist for : ${article_id}` })
            } 
            else {
                return commentCount(article);
            }
        })
        .then((article) => {
            res.status(200).send({article})
        })
        .catch(next)
}

const getCommentsForArticle = (req, res, next) => {
const { article_id } = req.params;
    Comment.find({belongs_to: article_id})
    .populate('belongs_to')
    .populate('created_by')
    .then((comments) => {
    res.status(200).send({comments})
    }).catch(next)
}

const addCommentToArticle = (req, res, next) => {
    
const { body, created_by } = req.body;
    const { article_id } = req.params;

   
    comment = new Comment({ body, created_by, belongs_to: article_id})
    comment.save()
    .then((comment) => {
          res.status(201).send({ comment })
        })
    .catch(next)
    
}


const updateArticleVotes = (req, res, next) => {
    const { article_id } = req.params
    const { vote } = req.query
    const vote_change = vote === 'up' ? 1 : vote === 'down' ? -1 : 0
    Article.findOneAndUpdate( { _id: article_id }, 
        { $inc: { votes: vote_change } }, 
        { new: true } )
    .then((article) => {
      res.send( { article } )
    })
    .catch(next)
  }

module.exports = { getArticles, 
    getArticleByID, 
    getArticleByID, 
    getCommentsForArticle, 
    addCommentToArticle,
    updateArticleVotes }
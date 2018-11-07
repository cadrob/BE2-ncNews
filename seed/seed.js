const mongoose = require('mongoose');
const { Article, Comment, Topic, User } = require('../models')
const { createMongoRefObj, formatArticles, formatComments } = require('../utils');




const seedDB = ({articlesData, commentsData, topicsData, usersData}) => {
    return mongoose.connection
    .dropDatabase()
    .then(() => {
       return Promise.all([Topic.insertMany(topicsData), User.insertMany(usersData)])
    })
    .then(([topicDocs, userDocs]) => { 
        const userRefs = createMongoRefObj(usersData, userDocs, 'username');
        const topicRefs = createMongoRefObj(topicsData, topicDocs, 'slug');
            return Promise.all([Article.insertMany(formatArticles(articlesData, userRefs, topicRefs)), userRefs]);
    }).then(([articleDocs, userRefs]) => {
        const articleRefs = createMongoRefObj(articlesData, articleDocs, 'title');
        return Comment.insertMany((formatComments(commentsData, userRefs, articleRefs)));
    })
    .catch(console.log)
}

module.exports = seedDB;

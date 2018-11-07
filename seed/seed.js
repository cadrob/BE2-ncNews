const mongoose = require('mongoose');
const { Article, Comment, Topic, User } = require('../models')
const { createMongoRefObj, formatArticles } = require('../utils');




const seedDB = ({articlesData, commentsData, topicsData, usersData}) => {
    return mongoose.connection
    .dropDatabase()
    .then(() => {
       return Promise.all([Topic.insertMany(topicsData), User.insertMany(usersData)])
    })
    .then(([topicDocs, userDocs]) => { 
        const userRefs = createMongoRefObj(usersData, userDocs, 'username');
        const topicRefs = createMongoRefObj(topicsData, topicDocs, 'slug');
            return Article.insertMany(formatArticles(articlesData, userRefs, topicRefs));
    }).then(console.log)
}

module.exports = seedDB;

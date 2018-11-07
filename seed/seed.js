const mongoose = require('mongoose');
const { Article, Comment, Topic, User } = require('../models')
// require in controllers here



const seedDB = ({articlesData, commentsData, topicsData, usersData}) => {
    return mongoose.connection
    .dropDatabase()
    .then(() => {
       return Promise.all([Topic.insertMany(topicsData), User.insertMany(usersData)])
    })
    .then(([topicDocs, userDocs]) => {  //here is the the array of two data arrays, needs to be destructored
        // const newArticles = articlesData.map(article => {
        //     return {
        //         ...article,
        //         //belongs_to ref to topic slug
        //         //created_by ref user mongo id
        //     }
        // })
        // return Article.insertMany(newArticles);
    })
}

module.exports = seedDB;

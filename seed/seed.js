const mongoose = require('mongoose');
const { Article, Comment, Topic, User } = require('../models')
const { createMongoRefObj } = require('../utils');




const seedDB = ({articlesData, commentsData, topicsData, usersData}) => {
    return mongoose.connection
    .dropDatabase()
    .then(() => {
       return Promise.all([Topic.insertMany(topicsData), User.insertMany(usersData)])
    })
    .then(([topicDocs, userDocs]) => { 
        //const userRefs = createRefObj(usersData, userDocs);
        const userRefs = createMongoRefObj(usersData, userDocs, 'username');
        console.log(userRefs['butter_bridge'])
    
    //    // here is the the array of two data arrays, needs to be destructored
    //     const newArticles = articlesData.map(article => {
    //         return {
    //             ...article,
    //             created_by: ref user mongo id
    //             //belongs_to ref to topic slug
                
    //         }
    //     })
        // return Article.insertMany(newArticles);
    })
}

module.exports = seedDB;

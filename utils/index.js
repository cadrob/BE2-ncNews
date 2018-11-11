const { Comment } = require('../models');
const createMongoRefObj = (data, docs, key) => { 
 
    return data.reduce((refObj, datum, index) => {
        refObj[datum[key]] = docs[index]._id
        return refObj;
    }, {});
}

const formatArticles = (articlesData, userRefs, topicRefs) => {
    return articlesData.map(article => {
        return {
            ...article,
            created_by: userRefs[article.created_by],
            belongs_to: article.topic
            
        }
    })

}

const formatComments = (commentsData, userRefs, articleRefs) => {
    return commentsData.map(comment => {
        return {
            ...comment,
            created_by: userRefs[comment.created_by],
            belongs_to: articleRefs[comment.belongs_to]
        }
    })
}

const commentCount = (article) => { 
        return Comment.countDocuments({ belongs_to: article._id })
    .then((commentNum) => {
      return { ...article._doc , commentCount: commentNum }
    })
  }

module.exports = { createMongoRefObj, formatArticles, formatComments, commentCount }
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

module.exports = { createMongoRefObj, formatArticles, formatComments }
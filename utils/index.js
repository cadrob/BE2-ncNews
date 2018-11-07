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
            belongs_to: topicRefs[article.topic]
            
        }
    })

}

module.exports = { createMongoRefObj, formatArticles }
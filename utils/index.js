const createMongoRefObj = (data, docs, key) => { //key is a string 
    return data.reduce((refObj, datum, index) => {
        refObj[datum[key]] = docs[index]._id
        return refObj;
    }, {});
}

module.exports = { createMongoRefObj }
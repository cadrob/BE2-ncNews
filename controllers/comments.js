const { Comment } = require ('../models');

const getComments = (req, res, next) => {
    Comment.find()
    .then((comments) => {
        res.status(200).send({comments})
    })
}

module.exports = { getComments }
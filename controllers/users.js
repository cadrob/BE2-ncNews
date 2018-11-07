const { User } = require ('../models');

const getUsers = (req, res, next) => {
    User.find()
    .then((users) => {
        res.status(200).send({users})
    })
}

module.exports = { getUsers }
const usersRouter = require('express').Router();
// controllers heree


usersRouter.route('')
    .get((req, res, next) => {
        res.send("Test for users")
    })

module.exports = usersRouter;
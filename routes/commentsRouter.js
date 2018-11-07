const commentsRouter = require('express').Router();
// controllers heree


commentsRouter.route('')
    .get((req, res, next) => {
        res.send("Test for comments")
    })

module.exports = commentsRouter;
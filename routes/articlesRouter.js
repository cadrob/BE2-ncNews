const articlesRouter = require('express').Router();
// controllers here


articlesRouter.route('')
    .get((req, res, next) => {
        res.send("Test for articles")
    })

module.exports = articlesRouter;
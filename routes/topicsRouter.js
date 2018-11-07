const topicsRouter = require('express').Router();
// controllers heree


topicsRouter.route('')
    .get((req, res, next) => {
        res.send("Test for topics")
    })

module.exports = topicsRouter;

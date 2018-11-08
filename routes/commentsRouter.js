const commentsRouter = require('express').Router();
const { getComments, updateCommentVotes, deleteComment } = require('../controllers/comments')


commentsRouter.route('')
    .get(getComments)

commentsRouter.route('/:comment_id/').patch(updateCommentVotes).delete(deleteComment)

module.exports = commentsRouter;
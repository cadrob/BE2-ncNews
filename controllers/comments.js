const { Comment } = require ('../models');

const getComments = (req, res, next) => {
    Comment.find()
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

const updateCommentVotes = (req, res, next) => {

    const { comment_id } = req.params
    const { vote } = req.query
    const vote_change = vote === 'up' ? 1 : vote === 'down' ? -1 : 0


    Comment.findOneAndUpdate( { _id: comment_id }, 
        { $inc: { votes: vote_change } }, 
        { new: true } )
    .then((comment) => {
      res.send( { comment } )
    })
    .catch(next)
  }

  const deleteComment = (req, res, next) => {
      const { comment_id } = req.params;
      Comment.findOneAndDelete( {_id: comment_id})
      .then((deletedComment) =>

      res.status(200).send('This document has been removed from the Database')
      )
      .catch(next);
  }

module.exports = { getComments, updateCommentVotes, deleteComment }
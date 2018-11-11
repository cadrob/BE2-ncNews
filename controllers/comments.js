const { Comment } = require ('../models');

const getComments = (req, res, next) => {
    Comment.find()
    .populate('belongs_to')
    .populate('created_by')
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

const updateCommentVotes = (req, res, next) => {

    const { comment_id } = req.params
    const { vote } = req.query
    const vote_change = vote === 'up' ? 1 : vote === 'down' ? -1 : 0
    
    if (!vote) next({ status: 400, msg: `---${Object.keys(req.query)[0]}--- is not a valid query.` })
    else 
    Comment.findOneAndUpdate( { _id: comment_id }, 
        { $inc: { votes: vote_change } }, 
        { new: true } )
    .then((comment) => {
      res.status(200).send( { comment } )
    })
    .catch(next)

  }

  const deleteComment = (req, res, next) => {
      const { comment_id } = req.params;
      Comment.findOneAndDelete( {_id: comment_id})
      .then((deletedComment) =>
    
      res.status(200).send({message: 'This document has been removed from the Database'})
      )
      .catch(next);
  }

module.exports = { getComments, updateCommentVotes, deleteComment }
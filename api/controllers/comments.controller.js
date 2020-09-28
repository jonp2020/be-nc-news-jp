const {
  fetchCommentById,
  updateComment,
  deleteCommentById,
} = require("../models/comments.model");

exports.patchComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  const numOfVotes = req.body.inc_votes;

  fetchCommentById(commentId)
    .then((comment) => {
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Sorry - the comment you have asked to update doesn't exist.",
        });
      } else if (numOfVotes === undefined) {
        return Promise.reject({
          status: 404,
          msg: "Could not update. Please check the spelling of the key fields.",
        });
      }
      updateComment(commentId, numOfVotes).then(([comment]) => {
        res.status(201).send({ comment });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  deleteCommentById(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

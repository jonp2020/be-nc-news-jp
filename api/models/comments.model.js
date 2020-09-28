const knex = require("../../db/connection");

exports.fetchCommentById = (commentId) => {
  return knex("comments").where("comment_id", commentId);
};

exports.updateComment = (commentId, numOfVotes) => {
  return knex("comments")
    .where("comment_id", commentId)
    .increment("votes", numOfVotes)
    .returning("*");
};

exports.deleteCommentById = (commentId) => {
  return knex("comments")
    .where("comment_id", commentId)
    .del()
    .then((delCount) => {
      if (delCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment not found.",
        });
      }
    });
};

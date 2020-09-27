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

const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const {
  createTimeStamp,
  changeComments,
} = require("../utils/data-manipulation");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      // console.log("re-seeding");
      return knex.migrate.latest();
    })
    .then(() => {
      return knex("topics").insert(topicData).returning("*");
    })
    .then(() => {
      return knex("users").insert(userData).returning("*");
    })
    .then((users) => {
      // console.log("users: ", users[0]);
      const articlesWithAdaptedTimeStamp = createTimeStamp(articleData);
      // const articlesWithDefaultVotes = createDefaultVotes(
      //   articlesWithAdaptedTimeStamp
      // );
      return knex
        .insert(articlesWithAdaptedTimeStamp)
        .into("articles")
        .returning("*");
    })
    .then((articles) => {
      const commentsWithAdaptedTimeStamp = createTimeStamp(commentData);
      // console.log("art: ", articles);
      const formattedComments = changeComments(
        commentsWithAdaptedTimeStamp,
        articles
      );
      return knex.insert(formattedComments).into("comments").returning("*");
    })
    .catch((err) => {
      console.log(err);
    });
};

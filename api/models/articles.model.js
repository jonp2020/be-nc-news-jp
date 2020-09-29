const { leftOuterJoin } = require("../../db/connection");
const knex = require("../../db/connection");

exports.fetchArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .modify((query) => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .count("comments AS comment_count")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order);
};

exports.fetchArticlesById = (articleId) => {
  return knex
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .where("articles.article_id", articleId)
    .count("comments AS comment_count")
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id");
};

exports.fetchArticleComments = (
  articleId,
  sort_by = "created_at",
  order = "desc"
) => {
  return knex("comments")
    .where("article_id", articleId)
    .orderBy(sort_by, order);
};

exports.insertArticle = (article) => {
  return knex("articles").insert(article).returning("*");
};

exports.insertComment = (comment) => {
  return knex("comments").insert(comment).returning("*");
};

exports.updateArticleVotes = (articleId, numOfVotes) => {
  return knex("articles")
    .where("article_id", articleId)
    .increment("votes", numOfVotes)
    .returning("*");
};

exports.deleteArticleById = (articleId) => {
  return knex("articles")
    .where("article_id", articleId)
    .del()
    .then((delCount) => {
      if (delCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found.",
        });
      }
    });
};

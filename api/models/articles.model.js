const knex = require("../../db/connection");

exports.fetchArticles = () => {
  return knex.select("*").from("articles");
};

exports.fetchArticlesById = (articleId) => {
  return knex("articles").where("article_id", articleId);
};

exports.fetchArticleComments = (articleId) => {
  // console.log("fetchComments: ", article);
  return knex("comments").where("article_id", articleId);
  // .where("article_id", article.article_id);
};

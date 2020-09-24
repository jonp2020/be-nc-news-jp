const knex = require("../../db/seeds/connection");

exports.fetchArticles = () => {
  return knex.select("*").from("articles");
};

exports.fetchArticlesById = (articleId) => {
  return knex("articles").where("article_id", articleId);
};

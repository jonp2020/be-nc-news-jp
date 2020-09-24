const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getArticles);

articlesRouter.get("/:article_id", getArticlesById);

articlesRouter.get("/:article_id/comments", getCommentsByArticleId);

module.exports = articlesRouter;

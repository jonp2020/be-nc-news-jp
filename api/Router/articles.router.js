const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getArticles);

articlesRouter.get("/:article_id", getArticlesById);

module.exports = articlesRouter;

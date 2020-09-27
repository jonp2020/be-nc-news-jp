const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postArticle,
  postComments,
  patchArticle,
} = require("../controllers/articles.controller");

articlesRouter.route("/").get(getArticles).post(postArticle);

articlesRouter.route("/:article_id").get(getArticlesById).patch(patchArticle);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postComments);

module.exports = articlesRouter;

const {
  fetchArticles,
  fetchArticlesById,
  fetchArticleComments,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      // console.log("articles: ", articles);
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchArticlesById(articleId)
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg:
            "Sorry - either the article you asked for doesn't exist or has been moved.Please try another article (Psss - I've heard article 10 is a good one!)",
        });
      }
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchArticleComments(articleId)
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg:
            "There are no comments for this article yet. Be the first to add your comments!",
        });
      }
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

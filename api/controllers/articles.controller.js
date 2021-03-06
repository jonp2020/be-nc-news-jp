const {
  fetchArticles,
  fetchArticlesById,
  fetchArticleComments,
  insertArticle,
  insertComment,
  updateArticleVotes,
  deleteArticleById,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  const { sort_by } = req.query;
  const { order } = req.query;
  const { author } = req.query;
  const { topic } = req.query;

  fetchArticles(sort_by, order, author, topic)
    .then((articles) => {
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
  const { sort_by } = req.query;
  const { order } = req.query;

  fetchArticleComments(articleId, sort_by, order)
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

exports.postArticle = (req, res, next) => {
  const article = req.body;
  insertArticle(article)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComments = (req, res, next) => {
  const comment = req.body;

  insertComment(comment)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  const numOfVotes = req.body.inc_votes;

  fetchArticlesById(articleId)
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg:
            "Sorry - either the article you have asked to update doesn't exist or has been moved.",
        });
      } else if (numOfVotes === undefined) {
        return Promise.reject({
          status: 404,
          msg: "Could not update. Please check the spelling of the key fields.",
        });
      }
      updateArticleVotes(articleId, numOfVotes).then(([article]) => {
        res.status(201).send({ article });
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  deleteArticleById(articleId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

const {
  fetchArticles,
  fetchArticlesById,
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
  fetchArticlesById(articleId).then((article) => {
    res.status(200).send({ article });
  });
};

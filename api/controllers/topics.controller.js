const { fetchTopics, insertTopic } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTopics = (req, res, next) => {
  const topic = req.body;
  insertTopic(topic)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};

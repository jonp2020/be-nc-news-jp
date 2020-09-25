const { fetchTopics, insertTopic } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopics = (req, res, next) => {
  // console.log("inside post topics:");
  const topic = req.body;
  // console.log("check topic request-----", topic);
  insertTopic(topic)
    .then(([topic]) => {
      // console.log("controller topic -------------: ", topic);
      res.status(201).send({ topic });
    })
    .catch((err) => {
      // console.log("topics err---", err);
      next(err);
    });
};

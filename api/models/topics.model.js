const knex = require("../../db/connection");

exports.fetchTopics = () => {
  return knex.select("*").from("topics");
};

exports.insertTopic = (topic) => {
  // console.log("model topic: -----", topic);
  return knex("topics").insert(topic).returning("*");
};

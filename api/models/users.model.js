const knex = require("../../db/seeds/connection");

exports.fetchUsers = () => {
  return knex.select("*").from("users");
};

exports.fetchUserByUsername = (username) => {
  return knex("users").where("username", username);
};

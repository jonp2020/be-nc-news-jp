const knex = require("../../db/connection");

exports.fetchUsers = () => {
  return knex.select("*").from("users");
};

exports.fetchUserByUsername = (username) => {
  return knex("users").where("username", username);
};

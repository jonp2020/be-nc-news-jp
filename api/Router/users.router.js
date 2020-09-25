const usersRouter = require("express").Router();
const {
  getUsers,
  getUserByUserName,
  postUser,
} = require("../controllers/users.controller");

usersRouter.route("/").get(getUsers).post(postUser);

usersRouter.get("/:username", getUserByUserName);

module.exports = usersRouter;

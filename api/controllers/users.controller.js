const {
  fetchUsers,
  fetchUserByUsername,
  insertUser,
} = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch();
};

exports.getUserByUserName = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No such user found for that username",
        });
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      // console.log("this is the error controller");
      next(err);
    });
};

exports.postUser = (req, res, next) => {
  const user = req.body;
  insertUser(user)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

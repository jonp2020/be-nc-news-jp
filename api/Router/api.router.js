const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const fs = require("fs");

apiRouter.route("/").get((req, res, next) => {
  return fs.promises
    .readFile("./endpoints.json", "utf8")
    .then((apiContent) => {
      console.log("content--- ", apiContent);
      res.status(200).send(apiContent);
    })
    .catch((err) => {
      console.log("err: ", err);
      next(err);
    });
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;

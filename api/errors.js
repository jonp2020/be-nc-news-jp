// EHMF

exports.handle400s = (err, req, res, next) => {
  // console.log("here in 400 errors", err);
  if (err.code === "42703") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23505") {
    res
      .status(400)
      .send({ msg: "The item you requested to post already exists." });
  } else if (err.code === "22P02") {
    res.status(400).send({
      msg:
        "Invalid article id. Please try again using a valid article id number.",
    });
  } else next(err);
};

exports.handleInvalidPath = (req, res, next) => {
  // console.log("invalid path ");
  console.log("inside error invalid path");
  res.status(404).send({ msg: "path not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log("here in custom errors: ", err);
  if (err) {
    res.status(err.status).send({ msg: err.msg });
  }
};

exports.handleInvalidPath = (req, res, next) => {
  // console.log("error invalid path1");
  res.status(404).send({ msg: "path not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log("custom errors: ", err);
  if (err) {
    res.status(err.status).send({ msg: err.msg });
  }
};

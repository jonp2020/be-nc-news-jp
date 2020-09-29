// const app = require("express")();

const express = require("express");
const app = express();
const apiRouter = require("./Router/api.router");
const {
	handleCustomErrors,
	handleInvalidPath,
	handle400s,
} = require("./errors");

app.use(express.json());
app.use("/api", apiRouter);
app.all("/*", handleInvalidPath);
app.use(handle400s);
app.use(handleCustomErrors);

module.exports = app;

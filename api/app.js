const app = require("express")();
const apiRouter = require('./Router/api.router');
const {handleCustomErrors, handleInvalidPath} = require('./errors');

app.use('/api', apiRouter)
app.all('/*', handleInvalidPath)
//app.use(handleCustomErrors)


module.exports = app;
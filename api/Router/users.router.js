const usersRouter = require('express').Router();
const { getUsers, getUserByUserName } = require('../controllers/users.controller')



usersRouter.route('/').get(getUsers)

usersRouter.get('/:username', getUserByUserName)


module.exports = usersRouter;

const { register, login } = require('./auth.controller');
const router = require('express').Router;

const authRouter = router();

authRouter.post('/register', register);
authRouter.post('/login', login);

module.exports = { authRouter };

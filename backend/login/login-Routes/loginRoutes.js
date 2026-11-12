const express = require('express');
const loginController = require('../login-Controller/loginController');
const { validarCredenciais } = require('../login-Middleware/loginMiddleware');

const router = express.Router();
router.post('/', validarCredenciais, loginController.autenticar);

module.exports = router;
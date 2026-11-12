const express = require('express');
const cadastroController = require('../cadastro-controller/cadastroController');
const { validarCadastro } = require('../cadastro-Middleware/cadastroMiddleware');

const router = express.Router();

router.post('/', validarCadastro, cadastroController.cadastrarCadastro);

module.exports = router;
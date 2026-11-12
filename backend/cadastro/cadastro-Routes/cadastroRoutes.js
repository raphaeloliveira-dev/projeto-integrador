const express = require('express');
const cadastroController = require('../cadastro-controller/cadastroController');
const { validarCadastro } = require('../cadastro-Middleware/cadastroMiddleware');
const clienteController = require('../../cliente/controller-cliente/clienteController');
const {
    validarIdCliente,
    validarAtualizacaoCliente
} = require('../../cliente/middleware-cliente/clienteMiddleware');

const router = express.Router();

router.post('/', validarCadastro, cadastroController.cadastrarCadastro);
router.put('/:id', validarIdCliente, validarAtualizacaoCliente, clienteController.atualizarCliente);
router.delete('/:id', validarIdCliente, clienteController.excluirCliente);

module.exports = router;

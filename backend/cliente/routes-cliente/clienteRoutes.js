
const express = require('express');
const router = express.Router();

const clienteController = require('../controller-cliente/clienteController');
const cadastroController = require('../../cadastro/cadastro-controller/cadastroController');
const { validarCadastro } = require('../../cadastro/cadastro-Middleware/cadastroMiddleware');
const {
    validarIdCliente,
    validarAtualizacaoCliente
} = require('../middleware-cliente/clienteMiddleware');
const { validarCredenciais } = require('../../login/login-Middleware/loginMiddleware');

// Listar todos os clientes
router.get('/', clienteController.listarClientes);

// Login do cliente
router.post('/login', validarCredenciais, clienteController.loginCliente);

// Cadastrar cliente
router.post('/', validarCadastro, cadastroController.cadastrarCadastro);

// Cadastro via rota explícita para o formulário
router.post('/cadastro', validarCadastro, cadastroController.cadastrarCadastro);

// Buscar cliente por ID
router.get('/:id', validarIdCliente, clienteController.buscarClientePorId);

// Atualizar cliente
router.put('/:id', validarIdCliente, validarAtualizacaoCliente, clienteController.atualizarCliente);

// Excluir cliente
router.delete('/:id', validarIdCliente, clienteController.excluirCliente);

module.exports = router;

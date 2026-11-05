
const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// Listar todos os clientes
router.get('/', clienteController.listarClientes);

// Login do cliente
router.post('/login', clienteController.loginCliente);

// Cadastrar cliente
router.post('/', clienteController.cadastrarCliente);

// Cadastro via rota explícita para o formulário
router.post('/cadastro', clienteController.cadastrarCliente);

// Buscar cliente por ID
router.get('/:id', clienteController.buscarClientePorId);

// Atualizar cliente
router.put('/:id', clienteController.atualizarCliente);

// Excluir cliente
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;

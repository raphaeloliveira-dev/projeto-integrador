
const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// Listar todos os clientes
router.get('/', clienteController.listarClientes);

// Buscar cliente por ID
router.get('/:id', clienteController.buscarClientePorId);

// Cadastrar cliente
router.post('/', clienteController.cadastrarCliente);

// Atualizar cliente
router.put('/:id', clienteController.atualizarCliente);

// Excluir cliente
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;

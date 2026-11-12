const express = require('express');
const vendaController = require('../venda-controller/vendaController');
const { validarClienteId, validarMovimentacao } = require('./../venda-Middleware/vendaMiddleware');

const router = express.Router();
router.post('/', validarClienteId, validarMovimentacao, vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.get('/cliente/:clienteId', validarClienteId, vendaController.listarVendas);

module.exports = router;
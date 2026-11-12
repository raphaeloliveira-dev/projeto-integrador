const express = require('express');
const compraController = require('../compra-Controller/compraController');
const { validarClienteId, validarMovimentacao } = require('../compra-Middleware/compraMiddleware');

const router = express.Router();
router.post('/', validarClienteId, validarMovimentacao, compraController.criarCompra);
router.get('/', compraController.listarCompras);
router.get('/cliente/:clienteId', validarClienteId, compraController.listarCompras);

module.exports = router;
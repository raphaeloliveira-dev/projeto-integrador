const express = require('express');
const compraController = require('../compra-Controller/compraController');
const {
    validarClienteId,
    validarIdRegistro,
    validarMovimentacao,
    validarTotal
} = require('../compra-Middleware/compraMiddleware');

const router = express.Router();
router.post('/', validarClienteId, validarMovimentacao, compraController.criarCompra);
router.get('/', compraController.listarCompras);
router.get('/cliente/:clienteId', validarClienteId, compraController.listarCompras);
router.put('/:id', validarIdRegistro, validarTotal, compraController.atualizarCompra);
router.delete('/:id', validarIdRegistro, compraController.excluirCompra);

module.exports = router;
const express = require('express');
const vendaController = require('../venda-controller/vendaController');
const {
    validarClienteId,
    validarIdRegistro,
    validarMovimentacao,
    validarTotal
} = require('./../venda-Middleware/vendaMiddleware');

const router = express.Router();
router.post('/', validarClienteId, validarMovimentacao, vendaController.criarVenda);
router.get('/', vendaController.listarVendas);
router.get('/cliente/:clienteId', validarClienteId, vendaController.listarVendas);
router.put('/:id', validarIdRegistro, validarTotal, vendaController.atualizarVenda);
router.delete('/:id', validarIdRegistro, vendaController.excluirVenda);

module.exports = router;
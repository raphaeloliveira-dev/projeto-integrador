const express = require('express');
const notaFiscalController = require('../noda-fiscal-controller/nota-fiscal-Controller');
const {
    validarClienteId,
    validarMovimentacao
} = require('../noda-fiscal-middleware/nota-fiscal-Middleware');

const router = express.Router();
router.post('/', validarClienteId, validarMovimentacao, notaFiscalController.criarNotaFiscal);
router.get('/', notaFiscalController.listarNotasFiscais);
router.get('/cliente/:clienteId', validarClienteId, notaFiscalController.listarNotasFiscais);

module.exports = router;
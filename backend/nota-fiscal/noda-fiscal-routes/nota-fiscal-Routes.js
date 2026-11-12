const express = require('express');
const notaFiscalController = require('../noda-fiscal-controller/nota-fiscal-Controller');
const {
    validarClienteId,
    validarIdRegistro,
    validarMovimentacao
} = require('../noda-fiscal-middleware/nota-fiscal-Middleware');
const { validarTotal } = require('../../middlewares/validacao');

const router = express.Router();
router.post('/', validarClienteId, validarMovimentacao, notaFiscalController.criarNotaFiscal);
router.get('/', notaFiscalController.listarNotasFiscais);
router.get('/cliente/:clienteId', validarClienteId, notaFiscalController.listarNotasFiscais);
router.put('/:id', validarIdRegistro, validarTotal, notaFiscalController.atualizarNotaFiscal);
router.delete('/:id', validarIdRegistro, notaFiscalController.excluirNotaFiscal);

module.exports = router;
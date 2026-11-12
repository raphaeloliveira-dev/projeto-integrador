const express = require('express');
const consultaController = require('../consulta-Controller/consultaController');
const {
    validarClienteConsulta,
    validarDescricaoConsulta
} = require('../consultaMiddleware/consultaMiddleware');
const { validarIdRegistro } = require('../../middlewares/validacao');

const router = express.Router();
router.post('/', validarClienteConsulta, consultaController.criarConsulta);
router.get('/', consultaController.listarConsultas);
router.get('/cliente/:clienteId', validarClienteConsulta, consultaController.listarConsultas);
router.put('/:id', validarIdRegistro, validarDescricaoConsulta, consultaController.atualizarConsulta);
router.delete('/:id', validarIdRegistro, consultaController.excluirConsulta);

module.exports = router;
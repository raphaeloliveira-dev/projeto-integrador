const router = require('express').Router();
const c = require('../controllers/CarrinhoController');

router.get('/cliente/:idCliente', c.listar);
router.post('/', c.adicionar);
router.put('/:id', c.alterarQuantidade);
router.delete('/:id', c.remover);

module.exports = router;

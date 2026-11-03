const CarrinhoModel = require('../models/CarrinhoModel');

const CarrinhoController = {
  async listar(req, res, next) {
    try {
      res.json(await CarrinhoModel.listarPorCliente(req.params.idCliente));
    } catch (err) { next(err); }
  },

  async adicionar(req, res, next) {
    try {
      const { id_cliente, produto, preco_unitario, quantidade } = req.body;
      if (!id_cliente || !produto || !(preco_unitario >= 0) || !(quantidade > 0)) {
        return res.status(400).json({ erro: 'Dados do item inválidos.' });
      }
      const id = await CarrinhoModel.adicionar({ id_cliente, produto, preco_unitario, quantidade });
      res.status(201).json({ id_carrinho: id });
    } catch (err) { next(err); }
  },

  async alterarQuantidade(req, res, next) {
    try {
      const { quantidade } = req.body;
      if (!Number.isInteger(quantidade) || quantidade < 1) {
        return res.status(400).json({ erro: 'Quantidade deve ser um inteiro maior que zero.' });
      }
      const n = await CarrinhoModel.alterarQuantidade(req.params.id, quantidade);
      if (!n) return res.status(404).json({ erro: 'Item não encontrado.' });
      res.json({ atualizado: true });
    } catch (err) { next(err); }
  },

  async remover(req, res, next) {
    try {
      const n = await CarrinhoModel.remover(req.params.id);
      if (!n) return res.status(404).json({ erro: 'Item não encontrado.' });
      res.status(204).end();
    } catch (err) { next(err); }
  },
};

module.exports = CarrinhoController;

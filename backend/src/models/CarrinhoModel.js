const pool = require('../config/db');

const CarrinhoModel = {
  async listarPorCliente(idCliente) {
    return pool.query(
      `SELECT id_carrinho, id_cliente, produto, preco_unitario, quantidade
         FROM carrinho_de_compra WHERE id_cliente = ?`,
      [idCliente]
    );
  },

  async adicionar({ id_cliente, produto, preco_unitario, quantidade }) {
    const r = await pool.query(
      `INSERT INTO carrinho_de_compra (id_cliente, produto, preco_unitario, quantidade)
       VALUES (?, ?, ?, ?)`,
      [id_cliente, produto, preco_unitario, quantidade]
    );
    return Number(r.insertId);
  },

  async alterarQuantidade(id, quantidade) {
    const r = await pool.query(
      'UPDATE carrinho_de_compra SET quantidade = ? WHERE id_carrinho = ?',
      [quantidade, id]
    );
    return r.affectedRows;
  },

  async remover(id) {
    const r = await pool.query('DELETE FROM carrinho_de_compra WHERE id_carrinho = ?', [id]);
    return r.affectedRows;
  },
};

module.exports = CarrinhoModel;

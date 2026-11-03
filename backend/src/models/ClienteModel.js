const pool = require('../config/db');

// Model: só fala com o banco. Sem req/res aqui.
// Sempre usar "?" (query parametrizada) para evitar SQL injection.
const ClienteModel = {
  async listar() {
    return pool.query('SELECT id_cliente, nome, email, telefone FROM cliente');
  },

  async buscarPorId(id) {
    const rows = await pool.query(
      'SELECT id_cliente, nome, email, telefone FROM cliente WHERE id_cliente = ?',
      [id]
    );
    return rows[0] || null;
  },

  async criar({ nome, email, telefone }) {
    const r = await pool.query(
      'INSERT INTO cliente (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefone || null]
    );
    // O driver mariadb devolve insertId como BigInt, e JSON não serializa BigInt.
    return Number(r.insertId);
  },

  async atualizar(id, { nome, email, telefone }) {
    const r = await pool.query(
      'UPDATE cliente SET nome = ?, email = ?, telefone = ? WHERE id_cliente = ?',
      [nome, email, telefone || null, id]
    );
    return r.affectedRows;
  },

  async remover(id) {
    const r = await pool.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
    return r.affectedRows;
  },
};

module.exports = ClienteModel;

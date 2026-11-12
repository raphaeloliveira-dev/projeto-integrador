const db = require('../../db');

const criarVenda = async (clienteId, total) => {
    const resultado = await db.query(
        'INSERT INTO venda (cliente_id, total) VALUES (?, ?)',
        [clienteId, total]
    );
    return Number(resultado.insertId);
};

const listarVendas = async () => db.query(
    'SELECT id, cliente_id, data_venda, total FROM venda ORDER BY data_venda DESC'
);

const listarVendasPorCliente = async (clienteId) => db.query(
    `SELECT id, cliente_id, data_venda, total
     FROM venda WHERE cliente_id = ? ORDER BY data_venda DESC`,
    [clienteId]
);

module.exports = { criarVenda, listarVendas, listarVendasPorCliente };
const db = require('../../db');

const criarCompra = async (clienteId, total) => {
    const resultado = await db.query(
        'INSERT INTO compra (cliente_id, total) VALUES (?, ?)',
        [clienteId, total]
    );
    return Number(resultado.insertId);
};

const listarCompras = async () => db.query(
    'SELECT id, cliente_id, data_compra, total FROM compra ORDER BY data_compra DESC'
);

const listarComprasPorCliente = async (clienteId) => db.query(
    `SELECT id, cliente_id, data_compra, total
     FROM compra WHERE cliente_id = ? ORDER BY data_compra DESC`,
    [clienteId]
);

module.exports = { criarCompra, listarCompras, listarComprasPorCliente };
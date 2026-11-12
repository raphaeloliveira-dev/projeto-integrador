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

const atualizarCompra = async (id, total) => {
    const resultado = await db.query('UPDATE compra SET total = ? WHERE id = ?', [total, id]);
    if (resultado.affectedRows > 0) {
        return resultado;
    }

    const existente = await db.query('SELECT id FROM compra WHERE id = ?', [id]);
    return { affectedRows: existente.length };
};

const excluirCompra = async (id) => db.query('DELETE FROM compra WHERE id = ?', [id]);

module.exports = {
    criarCompra,
    listarCompras,
    listarComprasPorCliente,
    atualizarCompra,
    excluirCompra
};
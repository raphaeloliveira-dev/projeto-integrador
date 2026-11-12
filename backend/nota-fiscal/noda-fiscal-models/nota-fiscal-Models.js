const db = require('../../db');

const criarNotaFiscal = async (clienteId, total) => {
    const resultado = await db.query(
        'INSERT INTO nota_fiscal (cliente_id, total) VALUES (?, ?)',
        [clienteId, total]
    );
    return Number(resultado.insertId);
};

const listarNotasFiscais = async () => db.query(
    'SELECT id, cliente_id, data_nota, total FROM nota_fiscal ORDER BY data_nota DESC'
);

const listarNotasFiscaisPorCliente = async (clienteId) => db.query(
    `SELECT id, cliente_id, data_nota, total
     FROM nota_fiscal WHERE cliente_id = ? ORDER BY data_nota DESC`,
    [clienteId]
);

module.exports = { criarNotaFiscal, listarNotasFiscais, listarNotasFiscaisPorCliente };
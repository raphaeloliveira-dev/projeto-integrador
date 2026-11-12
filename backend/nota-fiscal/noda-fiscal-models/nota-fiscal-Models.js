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

const atualizarNotaFiscal = async (id, total) => {
    const resultado = await db.query('UPDATE nota_fiscal SET total = ? WHERE id = ?', [
        total,
        id
    ]);
    if (resultado.affectedRows > 0) {
        return resultado;
    }

    const existente = await db.query('SELECT id FROM nota_fiscal WHERE id = ?', [id]);
    return { affectedRows: existente.length };
};

const excluirNotaFiscal = async (id) => db.query(
    'DELETE FROM nota_fiscal WHERE id = ?',
    [id]
);

module.exports = {
    criarNotaFiscal,
    listarNotasFiscais,
    listarNotasFiscaisPorCliente,
    atualizarNotaFiscal,
    excluirNotaFiscal
};
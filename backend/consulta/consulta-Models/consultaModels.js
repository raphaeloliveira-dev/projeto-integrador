const db = require('../../db');

const criarConsulta = async (clienteId, descricao) => {
    const resultado = await db.query(
        'INSERT INTO consulta (cliente_id, descricao) VALUES (?, ?)',
        [clienteId, descricao || null]
    );
    return Number(resultado.insertId);
};

const listarConsultas = async () => db.query(
    'SELECT id, cliente_id, data_consulta, descricao FROM consulta ORDER BY data_consulta DESC'
);

const listarConsultasPorCliente = async (clienteId) => db.query(
    `SELECT id, cliente_id, data_consulta, descricao
     FROM consulta WHERE cliente_id = ? ORDER BY data_consulta DESC`,
    [clienteId]
);

const atualizarConsulta = async (id, descricao) => {
    const resultado = await db.query('UPDATE consulta SET descricao = ? WHERE id = ?', [
        descricao,
        id
    ]);
    if (resultado.affectedRows > 0) {
        return resultado;
    }

    const existente = await db.query('SELECT id FROM consulta WHERE id = ?', [id]);
    return { affectedRows: existente.length };
};

const excluirConsulta = async (id) => db.query('DELETE FROM consulta WHERE id = ?', [id]);

module.exports = {
    criarConsulta,
    listarConsultas,
    listarConsultasPorCliente,
    atualizarConsulta,
    excluirConsulta
};
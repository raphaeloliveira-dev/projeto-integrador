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

module.exports = { criarConsulta, listarConsultas, listarConsultasPorCliente };
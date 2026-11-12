
const db = require('../../db');
const loginModels = require('../../login/login-Models/loginModels');

// Listar todos os clientes
const listarClientes = async () => {
    return db.query('SELECT id, nome, email FROM cliente ORDER BY id');
};

// Buscar cliente por ID
const buscarClientePorId = async (id) => {
    const resultado = await db.query(
        'SELECT id, nome, email FROM cliente WHERE id = ?',
        [id]
    );
    return resultado[0];
};

const loginCliente = async (email, senha) => {
    return loginModels.autenticarCliente(email, senha);
};

// Atualizar cliente
const atualizarCliente = async (id, nome, email) => {
    const sql = `
        UPDATE cliente
        SET nome = ?, email = ?
        WHERE id = ?
    `;

    return db.query(sql, [nome, email, id]);
};

// Excluir cliente
const excluirCliente = async (id) => {
    const sql = 'DELETE FROM cliente WHERE id = ?';
    const resultado = await db.query(sql, [id]);
    return resultado;
};

module.exports = {
    listarClientes,
    buscarClientePorId,
    loginCliente,
    atualizarCliente,
    excluirCliente
};

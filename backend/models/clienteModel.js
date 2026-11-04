
const db = require('../db');

// Listar todos os clientes
const listarClientes = async () => {
    const sql = 'SELECT * FROM cliente';
    const resultado = await db.query(sql);
    return resultado;
};

// Buscar cliente por ID
const buscarClientePorId = async (id) => {
    const sql = 'SELECT * FROM cliente WHERE id = ?';
    const resultado = await db.query(sql, [id]);
    return resultado[0];
};

// Cadastrar cliente
const cadastrarCliente = async (nome, email, senha) => {
    const sql = `
        INSERT INTO cliente (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    const resultado = await db.query(sql, [nome, email, senha]);
    return resultado;
};

// Atualizar cliente
const atualizarCliente = async (id, nome, email) => {
    const sql = `
        UPDATE cliente
        SET nome = ?, email = ?
        WHERE id = ?
    `;

    const resultado = await db.query(sql, [nome, email, id]);
    return resultado;
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
    cadastrarCliente,
    atualizarCliente,
    excluirCliente
};

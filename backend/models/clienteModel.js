
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

const buscarClientePorEmail = async (email) => {
    const sql = 'SELECT * FROM cliente WHERE email = ?';
    const resultado = await db.query(sql, [email]);
    return resultado[0] || null;
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

const cadastrarCadastro = async ({ nome, email, senha, endereco, telefone }) => {
    const sql = `
        INSERT INTO cadastro (nome, email, senha, endereco, telefone)
        VALUES (?, ?, ?, ?, ?)
    `;

    const resultado = await db.query(sql, [nome, email, senha, endereco, telefone]);
    return resultado;
};

const loginCliente = async (email, senha) => {
    const sql = 'SELECT * FROM cliente WHERE email = ? AND senha = ?';
    const resultado = await db.query(sql, [email, senha]);
    return resultado[0] || null;
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
    buscarClientePorEmail,
    cadastrarCliente,
    cadastrarCadastro,
    loginCliente,
    atualizarCliente,
    excluirCliente
};

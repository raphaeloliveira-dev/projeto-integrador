
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
    const conexao = await db.getConnection();

    try {
        await conexao.beginTransaction();
        const clientes = await conexao.query('SELECT email FROM cliente WHERE id = ?', [id]);
        if (clientes.length === 0) {
            await conexao.rollback();
            return { affectedRows: 0 };
        }

        await conexao.query(
            'UPDATE cliente SET nome = ?, email = ? WHERE id = ?',
            [nome, email, id]
        );
        await conexao.query(
            'UPDATE cadastro SET nome = ?, email = ? WHERE email = ?',
            [nome, email, clientes[0].email]
        );
        await conexao.commit();
        return { affectedRows: 1 };
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
};

// Excluir cliente
const excluirCliente = async (id) => {
    const conexao = await db.getConnection();

    try {
        await conexao.beginTransaction();
        const clientes = await conexao.query('SELECT email FROM cliente WHERE id = ?', [id]);
        if (clientes.length === 0) {
            await conexao.rollback();
            return { affectedRows: 0 };
        }

        for (const tabela of [
            'consulta',
            'login',
            'compra',
            'venda',
            'nota_fiscal',
            'carrinho_de_compra'
        ]) {
            await conexao.query(`DELETE FROM ${tabela} WHERE cliente_id = ?`, [id]);
        }
        await conexao.query('DELETE FROM cadastro WHERE email = ?', [clientes[0].email]);
        await conexao.query('DELETE FROM cliente WHERE id = ?', [id]);
        await conexao.commit();
        return { affectedRows: 1 };
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
};

module.exports = {
    listarClientes,
    buscarClientePorId,
    loginCliente,
    atualizarCliente,
    excluirCliente
};

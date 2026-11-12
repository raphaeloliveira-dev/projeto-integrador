const db = require('../../db');
const { criarHashSenha } = require('../../utils/senha');

const cadastrarCadastro = async ({ nome, email, senha, endereco, telefone }) => {
    const senhaHash = await criarHashSenha(senha);
    const conexao = await db.getConnection();

    try {
        await conexao.beginTransaction();

        const cliente = await conexao.query(
            'INSERT INTO cliente (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]
        );

        const cadastro = await conexao.query(
            `INSERT INTO cadastro (nome, email, senha, endereco, telefone)
             VALUES (?, ?, ?, ?, ?)`,
            [nome, email, senhaHash, endereco, telefone]
        );

        await conexao.commit();

        return {
            clienteId: Number(cliente.insertId),
            cadastroId: Number(cadastro.insertId)
        };
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
};

module.exports = { cadastrarCadastro };
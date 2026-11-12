const db = require('../../db');
const { criarHashSenha, verificarSenha } = require('../../utils/senha');

const autenticarCliente = async (email, senha) => {
    const clientes = await db.query(
        'SELECT id, nome, email, senha FROM cliente WHERE email = ?',
        [email]
    );
    const cliente = clientes[0];

    if (!cliente) {
        return null;
    }

    const senhaValida = await verificarSenha(senha, cliente.senha);
    if (!senhaValida) {
        const senhaLegadaValida = !cliente.senha.startsWith('scrypt$') && cliente.senha === senha;
        if (!senhaLegadaValida) {
            return null;
        }

        const senhaHash = await criarHashSenha(senha);
        await db.query('UPDATE cliente SET senha = ? WHERE id = ?', [senhaHash, cliente.id]);
        await db.query('UPDATE cadastro SET senha = ? WHERE email = ?', [senhaHash, email]);
    }

    await db.query('INSERT INTO login (cliente_id) VALUES (?)', [cliente.id]);
    return { id: cliente.id, nome: cliente.nome, email: cliente.email };
};

module.exports = { autenticarCliente };
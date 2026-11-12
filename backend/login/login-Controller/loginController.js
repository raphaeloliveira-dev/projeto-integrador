const loginModels = require('../login-Models/loginModels');

const autenticar = async (req, res) => {
    try {
        const cliente = await loginModels.autenticarCliente(req.body.email, req.body.senha);
        if (!cliente) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        }

        res.status(200).json({ mensagem: 'Login realizado com sucesso!', cliente });
    } catch (erro) {
        console.error('Erro ao autenticar cliente:', erro);
        res.status(500).json({ mensagem: 'Erro ao fazer login.' });
    }
};

module.exports = { autenticar };
const cadastroModels = require('../cadastro-Models/cadastroModels');

const cadastrarCadastro = async (req, res) => {
    try {
        const ids = await cadastroModels.cadastrarCadastro(req.body);

        res.status(201).json({
            mensagem: 'Cadastro realizado com sucesso!',
            id: ids.cadastroId,
            cliente: {
                id: ids.clienteId,
                nome: req.body.nome,
                email: req.body.email
            }
        });
    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY' || erro.errno === 1062) {
            return res.status(409).json({
                mensagem: 'Já existe um cadastro com este e-mail.'
            });
        }

        console.error('Erro ao cadastrar cliente:', erro);
        res.status(500).json({
            mensagem: 'Erro ao realizar cadastro.'
        });
    }
};

module.exports = { cadastrarCadastro };
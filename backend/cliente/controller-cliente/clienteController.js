
const clienteModel = require('../models-cliente/clienteModel');

// Listar clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.listarClientes();
        res.status(200).json(clientes);
    } catch (erro) {
        console.error('Erro ao listar clientes:', erro);
        res.status(500).json({
            mensagem: 'Erro ao listar clientes.'
        });
    }
};

// Buscar cliente por ID
const buscarClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteModel.buscarClientePorId(id);

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado'
            });
        }

        res.status(200).json(cliente);
    } catch (erro) {
        console.error('Erro ao buscar cliente:', erro);
        res.status(500).json({
            mensagem: 'Erro ao buscar cliente.'
        });
    }
};

const loginCliente = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Informe e-mail e senha.'
            });
        }

        const cliente = await clienteModel.loginCliente(email, senha);

        if (!cliente) {
            return res.status(401).json({
                mensagem: 'Credenciais inválidas.'
            });
        }

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            cliente: {
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email
            }
        });
    } catch (erro) {
        console.error('Erro ao fazer login:', erro);
        res.status(500).json({
            mensagem: 'Erro ao fazer login.'
        });
    }
};

// Atualizar cliente
const atualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        const resultado = await clienteModel.atualizarCliente(id, nome, email);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        res.status(200).json({
            mensagem: 'Cliente atualizado com sucesso!'
        });
    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY' || erro.errno === 1062) {
            return res.status(409).json({ mensagem: 'Já existe um cliente com este e-mail.' });
        }

        console.error('Erro ao atualizar cliente:', erro);
        res.status(500).json({
            mensagem: 'Erro ao atualizar cliente.'
        });
    }
};

// Excluir cliente
const excluirCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await clienteModel.excluirCliente(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
        }

        res.status(200).json({
            mensagem: 'Cliente excluído com sucesso!'
        });
    } catch (erro) {
        console.error('Erro ao excluir cliente:', erro);
        res.status(500).json({
            mensagem: 'Erro ao excluir cliente.'
        });
    }
};

module.exports = {
    listarClientes,
    buscarClientePorId,
    loginCliente,
    atualizarCliente,
    excluirCliente
};


const clienteModel = require('../models/clienteModel');

// Listar clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await clienteModel.listarClientes();
        res.status(200).json(clientes);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao listar clientes',
            erro: erro.message
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
        res.status(500).json({
            mensagem: 'Erro ao buscar cliente',
            erro: erro.message
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
        res.status(500).json({
            mensagem: 'Erro ao fazer login',
            erro: erro.message
        });
    }
};

// Cadastrar cliente
const cadastrarCliente = async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Nome, e-mail e senha são obrigatórios.'
            });
        }

        const clienteExistente = await clienteModel.buscarClientePorEmail(email);

        if (clienteExistente) {
            return res.status(409).json({
                mensagem: 'Já existe um cliente cadastrado com este e-mail.'
            });
        }

        const resultado = await clienteModel.cadastrarCliente(nome, email, senha);

        if (endereco || telefone) {
            await clienteModel.cadastrarCadastro({
                nome,
                email,
                senha,
                endereco: endereco || '',
                telefone: telefone || ''
            });
        }

        res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso!',
            id: Number(resultado.insertId),
            cliente: {
                id: Number(resultado.insertId),
                nome,
                email
            }
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao cadastrar cliente',
            erro: erro.message
        });
    }
};

// Atualizar cliente
const atualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        const resultado = await clienteModel.atualizarCliente(
            id, nome, email
        );

        res.status(200).json({
            mensagem: 'Cliente atualizado com sucesso!'
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar cliente',
            erro: erro.message
        });
    }
};

// Excluir cliente
const excluirCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await clienteModel.excluirCliente(id);

        res.status(200).json({
            mensagem: 'Cliente excluído com sucesso!'
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao excluir cliente',
            erro: erro.message
        });
    }
};

module.exports = {
    listarClientes,
    buscarClientePorId,
    loginCliente,
    cadastrarCliente,
    atualizarCliente,
    excluirCliente
};

const consultaModels = require('../consulta-Models/consultaModels');

const criarConsulta = async (req, res) => {
    try {
        const id = await consultaModels.criarConsulta(
            req.body.cliente_id,
            req.body.descricao?.trim() || null
        );
        res.status(201).json({ mensagem: 'Consulta registrada com sucesso.', id });
    } catch (erro) {
        console.error('Erro ao registrar consulta:', erro);
        res.status(500).json({ mensagem: 'Erro ao registrar consulta.' });
    }
};

const listarConsultas = async (req, res) => {
    try {
        const consultas = req.params.clienteId
            ? await consultaModels.listarConsultasPorCliente(req.params.clienteId)
            : await consultaModels.listarConsultas();
        res.status(200).json(consultas);
    } catch (erro) {
        console.error('Erro ao listar consultas:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar consultas.' });
    }
};

module.exports = { criarConsulta, listarConsultas };
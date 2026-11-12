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

const atualizarConsulta = async (req, res) => {
    try {
        const resultado = await consultaModels.atualizarConsulta(
            req.params.id,
            req.body.descricao
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Consulta não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Consulta atualizada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar consulta:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar consulta.' });
    }
};

const excluirConsulta = async (req, res) => {
    try {
        const resultado = await consultaModels.excluirConsulta(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Consulta não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Consulta excluída com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir consulta:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir consulta.' });
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

module.exports = { criarConsulta, listarConsultas, atualizarConsulta, excluirConsulta };
const notaFiscalModels = require('../noda-fiscal-models/nota-fiscal-Models');

const criarNotaFiscal = async (req, res) => {
    try {
        const id = await notaFiscalModels.criarNotaFiscal(
            req.body.cliente_id,
            req.body.total
        );
        res.status(201).json({ mensagem: 'Nota fiscal emitida com sucesso.', id });
    } catch (erro) {
        console.error('Erro ao emitir nota fiscal:', erro);
        res.status(500).json({ mensagem: 'Erro ao emitir nota fiscal.' });
    }
};

const atualizarNotaFiscal = async (req, res) => {
    try {
        const resultado = await notaFiscalModels.atualizarNotaFiscal(
            req.params.id,
            req.body.total
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Nota fiscal não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Nota fiscal atualizada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar nota fiscal:', erro);
        res.status(500).json({ mensagem: 'Erro ao atualizar nota fiscal.' });
    }
};

const excluirNotaFiscal = async (req, res) => {
    try {
        const resultado = await notaFiscalModels.excluirNotaFiscal(req.params.id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Nota fiscal não encontrada.' });
        }

        res.status(200).json({ mensagem: 'Nota fiscal excluída com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir nota fiscal:', erro);
        res.status(500).json({ mensagem: 'Erro ao excluir nota fiscal.' });
    }
};

const listarNotasFiscais = async (req, res) => {
    try {
        const notas = req.params.clienteId
            ? await notaFiscalModels.listarNotasFiscaisPorCliente(req.params.clienteId)
            : await notaFiscalModels.listarNotasFiscais();
        res.status(200).json(notas);
    } catch (erro) {
        console.error('Erro ao listar notas fiscais:', erro);
        res.status(500).json({ mensagem: 'Erro ao listar notas fiscais.' });
    }
};

module.exports = {
    criarNotaFiscal,
    listarNotasFiscais,
    atualizarNotaFiscal,
    excluirNotaFiscal
};
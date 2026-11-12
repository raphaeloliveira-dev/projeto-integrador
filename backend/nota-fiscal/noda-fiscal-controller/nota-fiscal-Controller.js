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

module.exports = { criarNotaFiscal, listarNotasFiscais };
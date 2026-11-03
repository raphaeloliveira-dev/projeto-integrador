const ClienteModel = require('../models/ClienteModel');

// Controller: recebe req, valida, chama o Model, devolve res com o status certo.
const emailValido = (e) => typeof e === 'string' && /^\S+@\S+\.\S+$/.test(e);

const ClienteController = {
  async listar(req, res, next) {
    try {
      res.json(await ClienteModel.listar());
    } catch (err) { next(err); }
  },

  async buscar(req, res, next) {
    try {
      const cliente = await ClienteModel.buscarPorId(req.params.id);
      if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado.' });
      res.json(cliente);
    } catch (err) { next(err); }
  },

  async criar(req, res, next) {
    try {
      const { nome, email, telefone } = req.body;
      if (!nome || !emailValido(email)) {
        return res.status(400).json({ erro: 'Informe nome e um e-mail válido.' });
      }
      const id = await ClienteModel.criar({ nome, email, telefone });
      res.status(201).json({ id_cliente: id });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
      }
      next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const { nome, email, telefone } = req.body;
      if (!nome || !emailValido(email)) {
        return res.status(400).json({ erro: 'Informe nome e um e-mail válido.' });
      }
      const n = await ClienteModel.atualizar(req.params.id, { nome, email, telefone });
      if (!n) return res.status(404).json({ erro: 'Cliente não encontrado.' });
      res.json({ atualizado: true });
    } catch (err) { next(err); }
  },

  async remover(req, res, next) {
    try {
      const n = await ClienteModel.remover(req.params.id);
      if (!n) return res.status(404).json({ erro: 'Cliente não encontrado.' });
      res.status(204).end();
    } catch (err) { next(err); }
  },
};

module.exports = ClienteController;

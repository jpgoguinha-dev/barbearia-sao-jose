const Agendamento = require('../models/agendamento');

const listarTodos = async (req, res) => {
  try {
    const { data, status } = req.query;
    const filtro = {};

    if (data) filtro.data = new Date(data);
    if (status) filtro.status = status;

    const agendamentos = await Agendamento.find(filtro)
      .populate('cliente', 'nome email')
      .sort({ data: 1, horario: 1 });

    res.json({ agendamentos });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar agendamentos' });
  }
};

const atualizarStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const statusValidos = ['pendente', 'confirmado', 'cancelado', 'concluido'];

    if (!statusValidos.includes(status)) {
      return res.status(400).json({ mensagem: 'Status inválido' });
    }

    const agendamento = await Agendamento.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('cliente', 'nome email');

    if (!agendamento) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
    }

    res.json({ agendamento });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar status' });
  }
};

module.exports = { listarTodos, atualizarStatus };
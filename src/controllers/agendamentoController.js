const Agendamento = require('../models/Agendamento');

const criar = async (req, res) => {
  try {
    const { servico, data, horario, observacao } = req.body;

    const horarioOcupado = await Agendamento.findOne({
      data,
      horario,
      status: { $nin: ['cancelado'] }
    });

    if (horarioOcupado) {
      return res.status(400).json({ mensagem: 'Horário já ocupado' });
    }

    const agendamento = await Agendamento.create({
      cliente: req.usuario._id,
      servico,
      data,
      horario,
      observacao
    });

    res.status(201).json({ agendamento });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar agendamento' });
  }
};

const listar = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find({ cliente: req.usuario._id })
      .sort({ data: 1, horario: 1 });

    res.json({ agendamentos });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar agendamentos' });
  }
};

const cancelar = async (req, res) => {
  try {
    const agendamento = await Agendamento.findOne({
      _id: req.params.id,
      cliente: req.usuario._id
    });

    if (!agendamento) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado' });
    }

    if (agendamento.status === 'concluido') {
      return res.status(400).json({ mensagem: 'Não é possível cancelar um agendamento concluído' });
    }

    agendamento.status = 'cancelado';
    await agendamento.save();

    res.json({ mensagem: 'Agendamento cancelado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cancelar agendamento' });
  }
};

module.exports = { criar, listar, cancelar };
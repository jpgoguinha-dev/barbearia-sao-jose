const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  servico: {
    type: String,
    required: true,
    enum: ['corte', 'barba', 'corte_barba']
  },
  data: {
    type: Date,
    required: true
  },
  horario: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pendente', 'confirmado', 'cancelado', 'concluido'],
    default: 'pendente'
  },
  observacao: {
    type: String,
    trim: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);
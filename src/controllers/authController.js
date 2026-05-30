const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const cadastrar = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    const { nome, email, senha } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    const usuario = await Usuario.create({ nome, email, senha });
    const token = gerarToken(usuario._id);

    res.status(201).json({
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email }
    });
  } catch (error) {
    console.error('Erro ao cadastrar:', error.message, error.stack);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
  }
};

const login = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
    }

    const senhaCorreta = await usuario.verificarSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
    }

    const token = gerarToken(usuario._id);

    res.json({
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

module.exports = { cadastrar, login };
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const autenticar = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select('-senha');

    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
};

module.exports = autenticar;

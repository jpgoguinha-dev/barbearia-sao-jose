const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const erros = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ mensagem: 'Erro de validação', erros });
  }

  // Email duplicado
  if (err.code === 11000) {
    return res.status(400).json({ mensagem: 'Email já cadastrado' });
  }

  // Token inválido
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }

  // Token expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ mensagem: 'Token expirado' });
  }

  // Erro genérico
  res.status(err.status || 500).json({
    mensagem: err.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;
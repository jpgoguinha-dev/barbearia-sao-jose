const adminMiddleware = (req, res, next) => {
  if (req.usuario.perfil !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado' });
  }
  next();
};

module.exports = adminMiddleware;
const express = require('express');
const router = express.Router();
const { cadastrar, login } = require('../controllers/authController');
const validarCampos = require('../middlewares/validarCampos');
const { validarCadastro, validarLogin } = require('../middlewares/authValidacao');
const autenticar = require('../middlewares/authMiddleware');

router.post('/cadastrar', validarCadastro, validarCampos, cadastrar);
router.post('/login', validarLogin, validarCampos, login);
router.get('/me', autenticar, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;
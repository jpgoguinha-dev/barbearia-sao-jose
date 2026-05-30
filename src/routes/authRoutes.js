const express = require('express');
const router = express.Router();
const { cadastrar, login } = require('../controllers/authController');
const validarCampos = require('../middlewares/validarCampos');
const { validarCadastro, validarLogin } = require('../middlewares/authValidacao');
router.post('/cadastrar', validarCadastro, validarCampos, cadastrar);
router.post('/login', validarLogin, validarCampos, login);

module.exports = router;
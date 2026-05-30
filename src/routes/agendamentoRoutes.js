const express = require('express');
const router = express.Router();
const { criar, listar, cancelar } = require('../controllers/agendamentoController');
const autenticar = require('../middlewares/authMiddleware');

router.post('/', autenticar, criar);
router.get('/', autenticar, listar);
router.patch('/:id/cancelar', autenticar, cancelar);

module.exports = router;
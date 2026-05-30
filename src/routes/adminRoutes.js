const express = require('express');
const router = express.Router();
const { listarTodos, atualizarStatus } = require('../controllers/adminController');
const autenticar = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/agendamentos', async (req, res, next) => {
  autenticar(req, res, () => {
    adminMiddleware(req, res, () => {
      listarTodos(req, res, next);
    });
  });
});

router.patch('/agendamentos/:id/status', async (req, res, next) => {
  autenticar(req, res, () => {
    adminMiddleware(req, res, () => {
      atualizarStatus(req, res, next);
    });
  });
});

module.exports = router;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();
const conectarBanco = require('./src/database');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const agendamentoRoutes = require('./src/routes/agendamentoRoutes');

const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await conectarBanco();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

iniciar();
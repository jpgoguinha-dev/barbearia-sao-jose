const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const conectarBanco = require('./src/database');

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 3000;

const iniciar = async () => {
  await conectarBanco();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

iniciar();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/barbearia-sao-jose').then(async () => {
  await mongoose.connection.collection('usuarios').updateOne(
    { email: 'admin@barbearia.com' },
    { $set: { perfil: 'admin' } }
  );
  console.log('Perfil atualizado!');
  process.exit();
});
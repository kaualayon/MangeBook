// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Criando o modelo de Useer
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }], // Campo para os favoritos

  role: { type: String, default: "user" },

  active: { type: Boolean, default: true } // Campo para status do usuário
});

const User = mongoose.model('User', userSchema);

//Exportando o modelo
module.exports = { User };

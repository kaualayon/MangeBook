// models/Favorite.js
const mongoose = require('mongoose');

//Criando o banco de dados dos favoritos
const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assumindo que o modelo User está correto
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books', // Deve fazer referência ao modelo Book
    required: true
  }
});

//Exportando o modelo
module.exports = mongoose.model('Favorite', favoriteSchema);

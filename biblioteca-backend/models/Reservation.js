const mongoose = require('mongoose');

//Criando o banco de dados das reservas
const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Relaciona com o modelo de usuário
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books', // Relaciona com o modelo de livros (se existir)
    required: true,
  },
  bookTitle: {
    type: String, // Nome do livro para exibição
    required: true,
  },
  reserveDate: {
    type: Date,
    default: Date.now, // Data em que a reserva foi feita
  },
  status: {
    type: String,
    enum: ['ativa', 'expirada', 'cancelada'], // Status da reserva
    default: 'ativa',
  },
});

//Exportando o modelo
module.exports = mongoose.model('Reservation', reservationSchema);

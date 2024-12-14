const mongoose = require('mongoose');


const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Relaciona com o modelo de usuário
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Relaciona com o modelo de livros (se existir)
    required: true,
  },
  bookTitle: {
    type: String, // Nome do livro para exibição
    required: true,
  },
  dueDate: {
    type: Date, // Data de devolução
    required: true,
  },
  loanDate: {
    type: Date,
    default: Date.now, // Data de empréstimo
  },
  returned: {
    type: Boolean,
    default: false, // Indica se o livro foi devolvido
  },
});

module.exports = mongoose.model('Loan', loanSchema);

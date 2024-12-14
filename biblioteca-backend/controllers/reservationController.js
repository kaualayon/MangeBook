const Reservation = require('../models/Reservation'); // Modelo de reservas
const Book = require('../models/book'); // Modelo de livros (ajuste o caminho conforme sua estrutura)

//POst criar a reserva
exports.createReservation = async (req, res) => {
  try {
    const userId = req.user._id; // Recupera o ID do usuário autenticado
    const { bookId, bookTitle } = req.body;

    if (!bookId || !bookTitle) {
      return res.status(400).json({ error: "Os campos 'bookId' e 'bookTitle' são obrigatórios." });
    }

    const newReservation = new Reservation({
      userId,
      bookId,
      bookTitle,
    });

    await newReservation.save();

    res.status(201).json({ message: "Reserva criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ error: "Erro ao criar a reserva." });
  }
};

//Put - Retornar livros reservados
exports.returnBook = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = req.user._id; // ID do usuário autenticado

    // Encontrar a reserva
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada.' });
    }

    // Verificar se o usuário é o proprietário da reserva
    if (reservation.user.toString() !== userId) {
      return res.status(403).json({ error: 'Você não pode devolver este livro.' });
    }

    // Atualizar o status da reserva para "completed"
    reservation.status = 'completed';
    await reservation.save();

    // Atualizar o número de cópias disponíveis do livro
    const book = reservation.book;
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ message: 'Livro devolvido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao devolver o livro.', details: error.message });
  }
};

// Get de retorno de informações
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id // ID do usuário autenticado

    // Buscar todas as reservas associadas ao usuário
    const reservations = await Reservation.find({ user: userId })
    
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: 'Você não tem reservas feitas.' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as reservas.', details: error.message });
  }
};
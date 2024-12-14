const express = require('express');
const { createReservation } = require('../controllers/reservationController');
const { getUserReservations } = require('../controllers/reservationController');
const { returnBook } = require('../controllers/reservationController');
const verifyToken = require('../Middleware/verifyToken');
const router = express.Router();

// Rota para criar uma reserva
router.post('/:bookId', verifyToken, createReservation);

// Rota para devolver um livro
router.post('/:reservationId/return', verifyToken, returnBook);

// Rota para obter as reservas de um usuário
router.get('/user/reservations', verifyToken, getUserReservations)

module.exports = router;
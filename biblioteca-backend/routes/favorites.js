const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Book = require('../models/book');
const User = require('../models/User'); 



// Adicionar livro aos favoritos
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bookId } = req.body; // O ID do livro a ser adicionado

    // Encontrar o usuário
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se o livro já está nos favoritos
    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
      res.status(200).json({ message: "Livro adicionado aos favoritos" });
    } else {
      res.status(400).json({ error: "Este livro já está nos favoritos" });
    }
  } catch (error) {
    console.error("Erro ao adicionar aos favoritos:", error);
    res.status(500).json({ error: "Erro ao adicionar aos favoritos" });
  }
});

//Pegando a lista de favoritos
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params._id; // ID do usuário autenticado
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    res.status(500).json({ error: "Erro ao carregar favoritos." });
  }
});


// Remover livro dos favoritos
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bookId } = req.body; // O ID do livro a ser removido

    // Encontrar o usuário
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Remover o livro dos favoritos
    const index = user.favorites.indexOf(bookId);
    if (index !== -1) {
      user.favorites.splice(index, 1);
      await user.save();
      res.status(200).json({ message: "Livro removido dos favoritos" });
    } else {
      res.status(400).json({ error: "Este livro não está nos favoritos" });
    }
  } catch (error) {
    console.error("Erro ao remover dos favoritos:", error);
    res.status(500).json({ error: "Erro ao remover dos favoritos" });
  }
});


module.exports = router;

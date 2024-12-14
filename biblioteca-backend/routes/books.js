const Book = require('../models/book');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');

require("dotenv").config();


//Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});



// Rota para adicionar um livro
router.post('/books/add', upload.single('image'), async (req, res) => {
    try {
      const { title, author, description, publicationYear, genre, isbn, availableCopies } = req.body;
  
      // Verifique se um arquivo foi enviado
      const image = req.file.path;
  
      // Crie o livro no banco de dados
      const newBook = new Book({
        title,
        author,
        description,
        publicationYear,
        genre,
        isbn,
        availableCopies,
        image
      });
  
      await newBook.save();
      res.status(201).json({ message: 'Livro adicionado com sucesso!', book: newBook });
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      res.status(500).json({ message: 'Erro ao adicionar livro.' });
    }
  });

// Rota para listar os livros
router.get('/books', async (req, res) => {
    try {
      const books = await Book.find(); // Busca todos os livros do banco
      res.status(200).json(books);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({ message: 'Erro ao buscar livros' });
    }
  });

  // Exemplo de rota no Express
router.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId); // Substitua pelo método usado no seu banco de dados
    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json(book);
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.put('/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
        const updatedData = req.body; // Os campos atualizados virão no corpo da requisição

        // Encontre o livro pelo ID e atualize-o
        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true }); // Certifique-se de usar o método correto do seu banco de dados

        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        res.status(200).json({ message: 'Livro atualizado com sucesso!', book: updatedBook });
    } catch (error) {
        console.error("Erro ao atualizar o livro:", error);
        res.status(500).json({ message: 'Erro ao atualizar o livro', error });
    }
});

//Excluindo o livro
router.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Remova o livro do banco de dados
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        res.status(200).json({ message: 'Livro removido com sucesso!' });
    } catch (error) {
        console.error("Erro ao remover o livro:", error);
        res.status(500).json({ message: 'Erro ao remover o livro', error });
    }
});

  
  

module.exports = router;

<template>
  <HeaderElement />
  <div class="edit-book-page">
    <!-- Fundo escuro -->
    <div class="background-overlay">
      <div class="content-container">
        <h2>Editar Livro</h2>
        <p>Selecione o livro que deseja editar:</p>

        <!-- Tabela de livros -->
        <div v-if="books.length > 0" class="book-table-container">
          <table class="book-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book._id">
                <td>
                  <img class="book-image" :src="getImageSrc(book.image)" alt="Capa do Livro" v-if="book.image" />
                </td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.isbn }}</td>
                <td>
                  <button class="edit-button" @click="selectBook(book)">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mensagem caso não existam livros -->
        <div v-else class="no-books">
          <p>Não há livros disponíveis para editar.</p>
        </div>

        <!-- Formulário de edição -->
        <div v-if="selectedBook" class="edit-form">
          <h3>Editando: {{ selectedBook.title }}</h3>
          <form @submit.prevent="updateBook">
            <div class="form-group">
              <label for="title">Título</label>
              <input v-model="selectedBook.title" id="title" type="text" required />
            </div>
            <div class="form-group">
              <label for="author">Autor</label>
              <input v-model="selectedBook.author" id="author" type="text" required />
            </div>
            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea v-model="selectedBook.description" id="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="publicationYear">Ano de Publicação</label>
              <input v-model="selectedBook.publicationYear" id="publicationYear" type="number" required />
            </div>
            <div class="form-group">
              <label for="genre">Gênero</label>
              <input v-model="selectedBook.genre" id="genre" type="text" required />
            </div>
            <div class="form-group">
              <label for="isbn">ISBN</label>
              <input v-model="selectedBook.isbn" id="isbn" type="text" required />
            </div>
            <div class="form-group">
              <label for="availableCopies">Cópias Disponíveis</label>
              <input v-model="selectedBook.availableCopies" id="availableCopies" type="number" required />
            </div>
            <button type="submit">Salvar Alterações</button>
            <button type="button" @click="cancelEdit">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <FooterElement />
</template>

<script>
import axios from "axios";
import HeaderElement from "@/components/HeaderElement.vue";
import FooterElement from "@/components/FooterElement.vue";

export default {
  components: {
    HeaderElement,
    FooterElement,
  },
  data() {
    return {
      books: [], // Lista de livros
      selectedBook: null, // Livro selecionado para edição
    };
  },
  created() {
    this.fetchBooks(); // Carregar livros ao criar o componente
  },
  methods: {

    getImageSrc(imagePath) {
    console.log('book.image:', imagePath);  // Verifica o valor de imagePath

    // Substitui barras invertidas por barras normais para garantir compatibilidade
    imagePath = imagePath.replace(/\\/g, '/');

    // Imagem Front
    if (imagePath && imagePath.startsWith('/images')) {
      return `${imagePath}`;  // Imagens vindas do back-end dentro da pasta public/images
    }

    // Se a imagem estiver na pasta "uploads" no back-end, monta a URL com o servidor
    if (imagePath && imagePath.startsWith('uploads')) {
      return `http://localhost:5000/${imagePath}`;  // Imagens vindas do back-end
    }

    // Caso não seja de nenhuma das duas situações acima, retorna o caminho original
    return imagePath; 
  },




    // Busca todos os livros do backend
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        this.books = response.data;
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        alert("Erro ao carregar os livros.");
      }
    },
    // Seleciona um livro para editar
    selectBook(book) {
      this.selectedBook = { ...book }; // Clona o livro para edição
    },
    // Atualiza o livro no backend
    async updateBook() {
      try {
        const { _id } = this.selectedBook;
        await axios.put(`http://localhost:5000/api/books/${_id}`, this.selectedBook);
        alert("Livro atualizado com sucesso!");
        this.selectedBook = null; // Reseta o formulário
        this.fetchBooks(); // Atualiza a lista de livros
      } catch (error) {
        console.error("Erro ao atualizar o livro:", error);
        alert("Erro ao atualizar o livro.");
      }
    },
    // Cancela a edição
    cancelEdit() {
      this.selectedBook = null;
    },
  },
};
</script>

<style scoped>
.background-overlay {
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.content-container {
  max-width: 900px;
  padding: 20px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.book-table-container {
  width: 100%;
  overflow-x: auto;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.book-table th, .book-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.book-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.book-table tr:hover {
  background-color: #f1f1f1;
}

.book-image {
  max-width: 80px; /* Limitar largura */
  max-height: 120px; /* Limitar altura */
  width: auto;
  height: auto;
  border-radius: 5px;
}

button {
  padding: 8px 12px;
  background-color: #0288d1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0277bd;
}

.edit-form {
  margin-top: 20px;
}

.edit-form h3 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #4caf50;
}

button[type="button"] {
  background-color: #f44336;
  margin-left: 10px;
}
</style>

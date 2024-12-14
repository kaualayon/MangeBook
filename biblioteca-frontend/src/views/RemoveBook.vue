<template>
  <HeaderElement />
  <div class="remove-book-page">
    <!-- Fundo escuro -->
    <div class="background-overlay">
      <div class="content-container">
        <h2>Remover Livro</h2>
        <p>Selecione o livro que deseja remover:</p>

        <!-- Tabela de livros -->
        <div v-if="books.length > 0" class="book-table-container">
          <table class="book-table">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Título</th>
                <th>Autor</th>
                <th>ISBN</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book._id">
                <td>
                  <img :src="getImageSrc(book.image)" alt="Capa do Livro" class="book-image" />
                </td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.isbn }}</td>
                <td>
                  <button @click="removeBook(book._id)">Remover</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mensagem caso não existam livros -->
        <div v-else class="no-books">
          <p>Não há livros disponíveis para remover.</p>
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
      books: [], // Lista de livros carregada do servidor
    };
  },
  created() {
    this.fetchBooks(); // Carregar livros ao criar o componente
  },
  methods: {
    getImageSrc(imagePath) {
      // Substitui barras invertidas por barras normais
      imagePath = imagePath.replace(/\\/g, "/");

      // Verifica os casos de imagem no frontend e backend
      if (imagePath.startsWith("/images")) {
        return `${imagePath}`;
      }
      if (imagePath.startsWith("uploads")) {
        return `http://localhost:5000/${imagePath}`;
      }
      return imagePath; // Retorna o caminho original
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

    // Remove um livro pelo ID
    async removeBook(bookId) {
      if (confirm("Tem certeza de que deseja remover este livro?")) {
        try {
          await axios.delete(`http://localhost:5000/api/books/${bookId}`);
          alert("Livro removido com sucesso!");
          this.fetchBooks(); // Atualiza a lista de livros após remoção
        } catch (error) {
          console.error("Erro ao remover o livro:", error);
          alert("Erro ao remover o livro.");
        }
      }
    },
  },
};
</script>
  
  <style scoped>
  /* Estilo geral */
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
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #b71c1c;
}

.no-books {
  margin-top: 20px;
  color: #777;
}
  </style>
  
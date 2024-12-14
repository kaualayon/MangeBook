<template>
  <HeaderElement />
  
  <div class="background-overlay">
    <div class="form-container">
      <h1 class="form-title">{{ isEditing ? "Editar Livro" : "Adicionar Livro" }}</h1>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title" class="form-label">Título:</label>
          <input type="text" id="title" v-model="book.title" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="author" class="form-label">Autor:</label>
          <input type="text" id="author" v-model="book.author" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Descrição:</label>
          <textarea id="description" v-model="book.description" class="form-textarea" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="publicationYear" class="form-label">Ano de Publicação:</label>
          <input type="number" id="publicationYear" v-model="book.publicationYear" class="form-input" min="0" required />
        </div>

        <div class="form-group">
          <label for="genre" class="form-label">Gênero:</label>
          <input type="text" id="genre" v-model="book.genre" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="isbn" class="form-label">ISBN:</label>
          <input type="text" id="isbn" v-model="book.isbn" class="form-input" required />
        </div>

        <div class="form-group">
          <label for="copiesAvailable" class="form-label">Número de Cópias Disponíveis:</label>
          <input type="number" id="copiesAvailable" v-model="book.copiesAvailable" class="form-input" min="0" required />
        </div>

        <div class="form-group">
          <label for="image" class="form-label">Imagem de Capa:</label>
          <input type="file" @change="handleImageUpload" id="image" class="form-input" accept="image/*" required />
        </div>

        <button type="submit" class="form-button">{{ isEditing ? "Salvar Alterações" : "Adicionar Livro" }}</button>
      </form>
    </div>
  </div>
  
  <FooterElement />
</template>

<script>
import axios from 'axios';
import HeaderElement from '@/components/HeaderElement.vue';
import FooterElement from '@/components/FooterElement.vue';

export default {
  name: "BookForm",
  components: {
    HeaderElement,
    FooterElement
  },
  data() {
    return {
      isEditing: false,
      book: {
        title: "",
        author: "",
        description: "",
        publicationYear: "",
        genre: "",
        isbn: "",
        copiesAvailable: 0,
        image: null
      },
      catalog: []  // Lista de livros no catálogo
    };
  },
  methods: {
    async submitForm() {
      if (this.isEditing) {
        console.log("Salvando alterações:", this.book);
      } else {
        await this.addBook();
      }
    },

    async addBook() {
      try {
        const formData = new FormData();
        formData.append('title', this.book.title);
        formData.append('author', this.book.author);
        formData.append('description', this.book.description);
        formData.append('publicationYear', this.book.publicationYear);
        formData.append('genre', this.book.genre);
        formData.append('isbn', this.book.isbn);
        formData.append('availableCopies', this.book.copiesAvailable);
        formData.append('image', this.book.image);

        const response = await axios.post('http://localhost:5000/api/books/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          console.log("Livro adicionado:", response.data.book);
          this.$emit('bookAdded', response.data.book);
          alert("Livro adicionado com sucesso!");
          this.clearForm();
          
          // Adicionando o livro ao catálogo local
          this.addBookToCatalog(response.data.book);
        } else {
          alert("Erro ao adicionar o livro. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao adicionar o livro:", error);
        alert(`Erro ao adicionar o livro. Detalhes: ${error.message}`);
      }
    },

    addBookToCatalog(book) {
      this.catalog.push(book);  // Adiciona o livro ao catálogo local
      console.log("Livro adicionado ao catálogo local:", book);
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.book.image = file;
      }
    },

    clearForm() {
      this.book = {
        title: "",
        author: "",
        description: "",
        publicationYear: "",
        genre: "",
        isbn: "",
        copiesAvailable: 0,
        image: null,
      };
    },
  },
};
</script>


<style scoped>
/* Div de fundo escuro que ocupa toda a tela */
.background-overlay {
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

/* Div do formulário */
.form-container {
  background-color: #ffffff;
  padding: 30px 40px; /* Reduzir o padding */
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px; /* Reduzir a largura */
}

/* Estilo do título (h1) */
.form-title {
  font-size: 25px; /* Diminuir o tamanho da fonte */
  color: #000000; /* Alterar para preto */
  text-align: center;
  margin-bottom: 20px; /* Reduzir a margem inferior */
  font-weight: bold;
}

/* Estilo dos rótulos (labels) */
.form-label {
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
  display: block;
  font-size: 16px;
}

/* Estilos dos campos de entrada (input) */
.form-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #D32F2F;
  box-shadow: 0 0 5px rgba(211, 47, 47, 0.5);
}

/* Estilo da área de texto (textarea) */
.form-textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-textarea:focus {
  border-color: #D32F2F;
  box-shadow: 0 0 5px rgba(211, 47, 47, 0.5);
}

/* Estilos do botão */
.form-button {
  background-color: #D32F2F;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #B71C1C;
}

/* Responsividade */
@media (max-width: 768px) {
  .form-container {
    width: 90%;
    padding: 20px;
  }
}
</style>

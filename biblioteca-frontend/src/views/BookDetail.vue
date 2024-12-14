<template>
  <HeaderElement />
  <div>
    <div v-if="isLoading" class="loading">
      Carregando detalhes do livro...
    </div>

    <div class="book-detail-container" v-else-if="book">
      <div class="book-image">
        <img :src="getImageSrc(book.image)" alt="Capa do Livro" v-if="book.image" />
      </div>
      <div class="book-info">
        <h1>{{ book.title }}</h1>
        <p class="author">Autor: {{ book.author }}</p>
        <p class="description">{{ book.description }}</p>
        <div class="ratings">
          <h2>Avaliações:</h2>
          <div class="rating-stars">
            <p>{{ book.rating }} ★</p>
            <p>{{ book.reviewCount }} avaliações</p>
          </div>
        </div>
        <div class="button-container">
          <button @click="reserveBook(book)" class="reserve-button">
            Reservar Livro
          </button>
          <button @click="borrowBook(book)" class="borrow-button">
            Emprestar Livro
          </button>
          <button @click="addToWishlist" class="add-to-wishlist">
            Adicionar à Lista de Desejos
          </button>
        </div>
        <div class="user-review">
          <h2>Deixe sua avaliação:</h2>
          <div class="star-rating">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              @click="setRating(star)"
            >
              <span :class="{ filled: star <= userRating }">★</span>
            </span>
          </div>
          <textarea
            v-model="userReview"
            placeholder="Escreva sua avaliação aqui..."
            rows="4"
          ></textarea>
          <button @click="submitReview" class="submit-review">
            Enviar Avaliação
          </button>
        </div>
        <div class="comments">
          <h2>Comentários:</h2>
          <ul>
            <li v-for="comment in comments" :key="comment.id">
              {{ comment.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <FooterElement />
</template>

<script>
import HeaderElement from "@/components/HeaderElement.vue";
import FooterElement from "@/components/FooterElement.vue";
import axios from "axios";

export default {
  name: "BookDetail",
  components: { HeaderElement, FooterElement },
  props: ["id"],
  data() {
    return {
      book: null,
      userRating: 0,
      userReview: "",
      comments: [],
      isLoading: true, // Controla o estado de carregamento
    };
  },
  async created() {
    const bookId = this.$route.params.id;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/${bookId}` // Substitua pela rota do seu backend
      );
      this.book = response.data;
    } catch (error) {
      console.error("Erro ao carregar o livro:", error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    getImageSrc(imagePath) {
      console.log("book.image:", imagePath); // Verifica o valor de imagePath

      // Substitui barras invertidas por barras normais para garantir compatibilidade
      imagePath = imagePath.replace(/\\/g, "/");

      // Imagem Front
      if (imagePath && imagePath.startsWith("/images")) {
        return `${imagePath}`; // Imagens vindas do back-end dentro da pasta public/images
      }

      // Se a imagem estiver na pasta "uploads" no back-end, monta a URL com o servidor
      if (imagePath && imagePath.startsWith("uploads")) {
        return `http://localhost:5000/${imagePath}`; // Imagens vindas do back-end
      }

      // Caso não seja de nenhuma das duas situações acima, retorna o caminho original
      return imagePath;
    },

    reserveBook(book) {
  const reservationData = {
    bookId: book._id,
    bookTitle: book.title,
  };

  const token = localStorage.getItem("token");

  axios
    .post("http://localhost:5000/api/reservations", reservationData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token JWT no cabeçalho
      },
    })
    .then(() => {
      alert(`Livro "${book.title}" reservado com sucesso!`);

      
      this.$router.push("/reservas");
    })
    .catch((error) => {
      console.error("Erro ao reservar livro:", error.response?.data || error);
      alert(`Erro ao reservar livro: ${error.response?.data?.message || "Erro desconhecido"}`);
    });
},

    borrowBook(book) {
      alert(`Você pegou emprestado: ${book.title}`);
    },
    addToWishlist() {
      alert("Livro adicionado à lista de desejos.");
    },
    setRating(star) {
      this.userRating = star;
    },
    submitReview() {
      if (this.userReview && this.userRating) {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.userReview,
        });
        this.userReview = "";
      }
    },
  },
};
</script>

<style scoped>
/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

/* Contêiner principal */
.book-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 25px 30px;
  margin: 40px auto;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Imagem do livro */
.book-image img {
  max-width: 200px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Informação do livro */
.book-info {
  margin-top: 20px;
  width: 100%;
  text-align: left;
}

/* Título */
h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
}

/* Autor */
.author {
  font-size: 1rem;
  color: #6c757d;
  font-style: italic;
  text-align: center;
  margin-bottom: 15px;
}

/* Descrição */
.description {
  font-size: 1rem;
  color: #495057;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Avaliações */
.ratings {
  margin-top: 15px;
  text-align: center;
}

.ratings h2 {
  font-size: 1.2rem;
  color: #343a40;
  margin-bottom: 10px;
}

.rating-stars p {
  font-size: 1rem;
  color: #6c757d;
}

/* Botões */
.button-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.button-container button {
  padding: 10px 15px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-weight: bold;
}

.reserve-button {
  background-color: #28a745;
  color: white;
}

.reserve-button:hover {
  background-color: #218838;
}

.borrow-button {
  background-color: #007bff;
  color: white;
}

.borrow-button:hover {
  background-color: #0056b3;
}

.add-to-wishlist {
  background-color: #ffc107;
  color: #343a40;
}

.add-to-wishlist:hover {
  background-color: #e0a800;
}

/* Avaliação do usuário */
.user-review {
  margin-top: 25px;
  text-align: center;
}

.star-rating {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.star {
  cursor: pointer;
  font-size: 1.8rem;
  color: #ccc;
  transition: color 0.3s ease;
}

.star.filled {
  color: #f1c40f;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

textarea:focus {
  border-color: #007bff;
}

/* Botão de enviar avaliação */
.submit-review {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-review:hover {
  background-color: #0056b3;
}

/* Comentários */
.comments {
  margin-top: 20px;
  width: 100%;
  text-align: left;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
}

.comments h2 {
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 10px;
}

.comments ul {
  list-style: none;
  padding: 0;
}

.comments li {
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
  color: #333;
  font-size: 0.9rem;
}

.comments li:last-child {
  border-bottom: none;
}

/* Estado de carregamento */
.loading {
  font-size: 1.2rem;
  text-align: center;
  color: #6c757d;
  margin-top: 50px;
}

</style>


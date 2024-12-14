<template>
    <HeaderElement />
    <div class="favorites-page">
  
      <div class="content">
        <h2>Meus Favoritos</h2>
  
        <!-- Mensagem quando não há livros favoritos -->
        <div v-if="favoriteBooks.length === 0" class="no-favorites">
          <p>Você ainda não adicionou nenhum livro aos favoritos.</p>
        </div>
  
        <!-- Lista de livros favoritos -->
        <div v-else class="book-list">
          <div class="book-card" v-for="book in favoriteBooks" :key="book.id">
            <img :src="book.imageUrl" alt="Capa do livro" class="book-image" />
            <h3>{{ book.title }}</h3>
            <p><strong>Autor:</strong> {{ book.author }}</p>
            <p><strong>Descrição:</strong> {{ book.description }}</p>
            <button @click="removeFromFavorites(book.id)">Remover dos Favoritos</button>
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
    components: {
      HeaderElement,
      FooterElement,
    },
    data() {
      return {
        favoriteBooks: [], // Livros favoritos do usuário
      };
    },
    created() {
        this.fetchFavorites();
    },
    methods: {
      async fetchFavorites() {
  try {
    const userId = localStorage.getItem('userId'); // ID do usuário no localStorage
    console.log("userId:", userId); // Verifica o userId

    const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
    console.log(response.data); // Log dentro do bloco try, depois da resposta ser recebida
    this.favoriteBooks = response.data.favorites; // A resposta deve conter um array de livros favoritos
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    alert("Erro ao carregar a lista de favoritos.");
  }
}
    },
  };
  </script>
  
  <style scoped>
.favorites-page {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.favorites-page h2 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.no-favorites {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.favorite-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 260px;
  text-align: center;
}

.book-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.book-details h3 {
  font-size: 20px;
  margin: 10px 0 5px;
  color: #333;
}

.book-details p {
  font-size: 16px;
  color: #666;
}
</style>

  
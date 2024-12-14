<template>
  <!-- Incluindo o HeaderElement -->
  <HeaderElement />

  <!-- Título da HomePage -->
  <h2 class="page-title">Dashboard</h2>

  <!-- Status de Empréstimos, Devoluções e Reservas -->
  <div class="status-cards">
    <div class="status-card">
      <h3>Empréstimos Ativos</h3>
      <p class="status-number">{{ activeLoans }}</p>
      <p class="status-info">Livros emprestados atualmente</p>
    </div>

    <div class="status-card">
      <h3>Devoluções Pendentes</h3>
      <p class="status-number">{{ pendingReturns }}</p>
      <p class="status-info">Livros aguardando devolução</p>
    </div>

    <div class="status-card">
      <h3>Reservas</h3>
      <p class="status-number">{{ activeReservations }}</p>
      <p class="status-info">Livros reservados</p>
    </div>
  </div>

  <!-- Gerenciamento de usuários (somente para admin) -->
  <div v-if="role === 'admin'" class="catalog-actions">
    <router-link to="/AdminUsersPage">
      <button class="action-btn">Gerenciar Usuários</button>
    </router-link>
  </div>

  <!-- Catálogo de Livros -->
  <div class="catalog-page">
    <!-- Título do Catálogo de Livros -->
    <h2 class="page-title">Catálogo de Livros</h2>

    <!-- Botões para Adicionar, Editar e Remover Livros (somente para admin) -->
    <div class="catalog-actions">
      <router-link v-if="role === 'admin'" to="/BookForm">
        <button class="action-btn">Adicionar Livro</button>
      </router-link>
      <router-link v-if="role === 'admin'" to="/editarLivro">
        <button class="action-btn">Editar Livro</button>
      </router-link>
      <router-link v-if="role === 'admin'" to="/removerLivro">
        <button class="action-btn">Remover Livro</button>
      </router-link>
      <div v-else>
        <p class="error-message">Você não tem permissão para realizar esta ação.</p>
      </div>
    </div>

    <!-- Catálogo de Livros -->
    <div class="book-catalog">
      <div v-if="books.length === 0" class="no-books">
        <p>Não há livros disponíveis no catálogo.</p>
      </div>
      <div v-else>
        <div class="book-list">
          <div class="book-card" v-for="book in books" :key="book.id">
            <div class="book-image">
              <img :src="getImageSrc(book.image)" alt="Capa do Livro" v-if="book.image" />
            </div>
            <h4>{{ book.title }}</h4>
            <p>{{ book.author }}</p>
            <p>Quantidade Disponível: <span :class="book.quantity > 0 ? 'available' : 'unavailable'">{{ book.quantity }}</span></p>
            <!-- Botões de Ação -->
            <div class="book-buttons">
              <button @click="viewBookDetails(book._id)">Ver Detalhes</button>
              <button @click="addToFavorites(book)">Adicionar aos Favoritos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterElement />
</template>


<script>
import HeaderElement from "@/components/HeaderElement.vue";
import FooterElement from "@/components/FooterElement.vue";

export default {
  name: "HomePage",
  components: {
    HeaderElement,
    FooterElement,
  },
  data() {
    return {
      books: [], // Lista de livros
      role: "", // Papel do usuário (admin ou user)
      username: "User", // Nome do usuário
      errorMessage: "", // Mensagem de erro caso o usuário não tenha permissão
    };
  },

  created() {
    this.loadBooksFromStorage();
    this.loadBooksFromAPI();
    this.fetchUserRole(); // Carregar o papel do usuário
  },

  methods: {
    async fetchUserRole() {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token não encontrado");

    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    // Verifique o que está sendo retornado pela API
    const userData = await response.json();
    console.log("Resposta da API:", userData); // Verifique a estrutura da resposta

    if (userData.role) {
      this.role = userData.role;  // Atualiza a variável de role
      this.username = userData.username;
      console.log("Role atribuída:", this.role);
    } else {
      console.error("A propriedade 'role' não foi encontrada na resposta da API.");
    }
  } catch (error) {
    console.error("Erro ao obter papel do usuário:", error);
  }
},

    getImageSrc(imagePath) {
      if (!imagePath) return "";
      imagePath = imagePath.replace(/\\/g, "/");
      if (imagePath.startsWith("/images")) return `${imagePath}`;
      if (imagePath.startsWith("uploads")) return `http://localhost:5000/${imagePath}`;
      return imagePath;
    },

    async loadBooksFromAPI() {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        if (!response.ok) throw new Error("Erro ao carregar livros da API");
        this.books = await response.json();
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      }
    },

    viewBookDetails(bookId) {
      if (bookId) {
        this.$router.push(`/book/${bookId}`);
      } else {
        console.error("ID do livro não encontrado!");
      }
    },

    addToFavorites(book) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorites.find((fav) => fav.id === book.id)) {
        alert("Este livro já está nos favoritos!");
        return;
      }
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Livro adicionado aos favoritos!");
    },

    loadBooksFromStorage() {
      const books = localStorage.getItem("books");
      if (books) this.books = JSON.parse(books);
    },

    handleAdminAction(action) {
      if (this.role !== 'admin') {
        this.errorMessage = 'Você não tem permissão para realizar esta ação.';
        return;
      }

      // Realiza a ação para administradores
      this.errorMessage = ''; // Limpa a mensagem de erro
      // Redireciona para a página correspondente
      if (action === 'add') {
        this.$router.push('/BookForm');
      } else if (action === 'edit') {
        this.$router.push('/editarLivro');
      } else if (action === 'remove') {
        this.$router.push('/removerLivro');
      }
    },
  },
};
</script>



<style scoped>
/* Estilo do contêiner e botões */
.book-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Estilo dos botões */
.book-buttons button {
  padding: 8px 12px; /* Ajustado padding para aumentar a área clicável */
  border: none;
  background-color: #D32F2F;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1 1 45%; /* Botões ocupam até 45% da largura */
  min-width: 100px;
  box-sizing: border-box;
}

.book-buttons button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.book-buttons button:hover:not(:disabled) {
  background-color: #B71C1C;
}

/* Estilo geral da página de catálogo */
.catalog-page {
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 20px;
}

/* Título do catálogo */
.page-title {
  margin-top: 20px;
    text-align: center;
    margin-top: 20px;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    text-transform: uppercase;
    color: #333;
}

/* Botões de ação */
.catalog-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.action-btn {
  background-color: #d32f2f;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s ease;
}

.action-btn:hover {
  background-color: #d32f2f;
    transform: scale(1.05);
}

/* Seção de Catálogo de Livros */
.book-catalog {
  margin-top: 40px;
}

.book-catalog h3 {
  font-size: 24px; /* Aumentado o tamanho do título */
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Layout do catálogo de livros */
.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.book-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px; /* Ajustado padding para um card mais confortável */
  text-align: center;
  transition: transform 0.3s ease;
  max-width: 180px; /* Diminuído o tamanho do card */
  margin: 0 auto;
}

.book-card:hover {
  transform: scale(1.05);
}

.book-card h4 {
  font-size: 18px; /* Aumentado o tamanho da fonte do título */
  margin-bottom: 12px;
}

.book-card p {
  font-size: 14px;
  margin-bottom: 12px;
}

.book-card button {
  background-color: #D32F2F;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.book-card button:hover {
  background-color: #B71C1C;
}

.book-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  max-height: 200px; /* Limitando a altura da imagem */
  object-fit: cover; /* Mantém a proporção da imagem sem distorcer */
  margin-bottom: 16px;
}

/* Seção sem livros */
.no-books {
  text-align: center;
  font-size: 16px;
  color: #777;
  padding: 20px;
}

/* Saudação ao usuário */
.welcome-message {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;
}

.welcome-message h2 {
  font-size: 24px;
  font-weight: 700;
  color: #D32F2F;
  margin-bottom: 12px;
}

.welcome-message p {
  font-size: 16px;
  color: #555;
}

/* Cards de Status */
.status-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}

.status-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.status-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.status-number {
  font-size: 40px;
  font-weight: 700;
  color: #D32F2F;
  margin-bottom: 12px;
}

.status-info {
  font-size: 14px;
  color: #777;
}

.status-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Media Queries para telas menores */
@media (max-width: 768px) {
  .book-card {
    width: 90%;
    max-width: 350px;
  }

  .book-list {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 22px;
  }

  .book-card {
    width: 90%;
    max-width: 380px;
  }
}
</style>


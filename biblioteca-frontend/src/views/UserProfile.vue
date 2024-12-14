<template>
  <HeaderElement />
  <div class="user-profile">
    <h2 class="page-title">Meu Perfil</h2>

    <!-- Exibe mensagem de erro, se houver -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Exibe o carregamento enquanto busca os dados -->
    <div v-else-if="!user" class="loading-message">
      Carregando informações...
    </div>

    <!-- Exibe as informações do usuário -->
    <div v-else>
      <div class="user-info">
        <div class="profile-picture">
          <img src="https://via.placeholder.com/150" alt="Foto do Usuário" />
          <button class="change-picture">Alterar Foto</button>
        </div>
        <div class="user-details">
          <h3>{{ user.name }}</h3>
          <p>Email: {{ user.email }}</p>
          <p>Registro: {{ user.registrationDate }}</p>
        </div>
      </div>

      <!-- Histórico de Empréstimos -->
      <div class="loan-history">
        <h3>Histórico de Empréstimos</h3>
        <div v-if="loans.length === 0" class="no-loans">
          <p>Você ainda não tem empréstimos registrados.</p>
        </div>
        <ul v-else>
          <li v-for="loan in loans" :key="loan.id">
            <span>{{ loan.bookTitle }}</span> - <span>{{ loan.dueDate }}</span>
            <button @click="viewLoanDetails(loan.id)">Ver Detalhes</button>
          </li>
        </ul>
      </div>

      <!-- Reservas -->
      <div class="reservations">
        <h3>Reservas Ativas</h3>
        <div v-if="reservations.length === 0" class="no-reservations">
          <p>Você não tem reservas ativas.</p>
        </div>
        <ul v-else>
          <li v-for="reservation in reservations" :key="reservation.id">
            <span>{{ reservation.bookTitle }}</span> - <span>{{ reservation.reserveDate }}</span>
            <button @click="viewReservationDetails(reservation.id)">Ver Detalhes</button>
          </li>
        </ul>
      </div>
    </div>
    <button @click="logout" class="logout-btn">Sair</button>
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
      user: null, // Dados do usuário
      loans: [], // Histórico de empréstimos
      reservations: [], // Reservas ativas
      errorMessage: null, // Mensagem de erro, caso ocorra
    };
  },
  async created() {
    try {
      // Obtém o token do localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData || !userData.token) {
        // Se não houver token, redireciona para a página de login
        this.$router.push("/login");
        return;
      }

      // Faz a requisição para obter os dados do usuário
      const response = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${userData.token}`, // Adiciona o token no cabeçalho
        },
      });

      // Atualiza os dados do usuário
      this.user = response.data.user;
      this.loans = response.data.loans || [];
      this.reservations = response.data.reservations || [];
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
      this.errorMessage = "Erro ao carregar as informações do usuário.";
    }
  },
  methods: {
    viewLoanDetails(loanId) {
      console.log(`Visualizando detalhes do empréstimo com ID: ${loanId}`);
      // Implementar a lógica para visualizar detalhes do empréstimo
    },
    viewReservationDetails(reservationId) {
      console.log(`Visualizando detalhes da reserva com ID: ${reservationId}`);
      // Implementar a lógica para visualizar detalhes da reserva
    },
    logout() {
      // Limpa os dados do localStorage e redireciona para login
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

  
  <style scoped>
 /* Estilo geral da página de perfil */
.user-profile {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

/* Título da página */
.page-title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
}

/* Seção de Informações do Usuário */
.user-info {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin-bottom: 40px;
  align-items: center;
  box-sizing: border-box;
}

.profile-picture img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.change-picture {
  background-color: #D32F2F;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  text-align: center;
}

.change-picture:hover {
  background-color: #B71C1C;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-details h3 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.user-details p {
  font-size: 16px;
  color: #777;
}

/* Seções de Histórico e Reservas */
.loan-history,
.reservations {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin-bottom: 40px;
}

.loan-history h3,
.reservations h3 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.loan-history ul,
.reservations ul {
  list-style-type: none;
  padding: 0;
}

.loan-history li,
.reservations li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #555;
}

.loan-history button,
.reservations button {
  background-color: #D32F2F;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.loan-history button:hover,
.reservations button:hover {
  background-color: #B71C1C;
}

/* Mensagem de ausência de dados */
.no-loans,
.no-reservations {
  text-align: center;
  font-size: 16px;
  color: #777;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
}

/* Botão de Logout */
.logout-btn {
  background-color: #D32F2F;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s;
  margin-top: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

.logout-btn:hover {
  background-color: #B71C1C;
  transform: scale(1.05);
}

/* Responsividade */
@media (max-width: 768px) {
  .user-info {
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .profile-picture img {
    width: 120px;
    height: 120px;
  }

  .loan-history,
  .reservations {
    padding: 15px;
  }
}

  </style>
  
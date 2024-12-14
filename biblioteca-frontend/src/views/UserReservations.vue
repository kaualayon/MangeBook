<template>
    <HeaderElement />
    <div class="reservations-page">
      <div class="content">
        <h2 class="page-title">Minhas Reservas</h2>
        
        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
  
        <!-- Carregando -->
        <div v-else-if="loading" class="loading-message">
          Carregando reservas...
        </div>
  
        <!-- Exibição da tabela -->
        <div v-else>
          <table v-if="reservations.length > 0" class="reservations-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Título do Livro</th>
                <th>Data da Reserva</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(reservation, index) in reservations" :key="reservation._id">
                <td>{{ index + 1 }}</td>
                <td>{{ reservation.bookTitle }}</td>
                <td>{{ formatDate(reservation.reserveDate) }}</td>
                <td>{{ reservation.status }}</td>
              </tr>
            </tbody>
          </table>
          
          <!-- Mensagem se não houver reservas -->
          <div v-else class="no-reservations">
            Você não possui reservas ativas.
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
        reservations: [], // Lista de reservas
        loading: true, // Indica carregamento
        errorMessage: null, // Mensagem de erro
      };
    },
    methods: {
      async fetchReservations() {
  this.loading = true; // Inicia o estado de carregamento
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token não encontrado");

    const response = await axios.get("http://localhost:5000/api/user/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verifique o que está sendo retornado na resposta
    console.log('Resposta da API:', response.data);

    // Se a resposta for um array com as reservas diretamente, atribua diretamente à variável reservations
    this.reservations = response.data || [];
  } catch (error) {
    console.error("Erro ao buscar as reservas:", error.response?.data || error);
    // Exibe a mensagem de erro
    this.errorMessage = error.response?.data?.error || "Erro ao carregar as reservas.";
    // Se o erro for relacionado ao token inválido (código 403)
    if (error.response?.status === 403) {
      alert("Token inválido. Faça login novamente.");
      this.$router.push("/login");  // Redireciona para a página de login
    }
  } finally {
    this.loading = false; // Finaliza o estado de carregamento
  }
},
      formatDate(date) {
        return new Date(date).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    created() {
      this.fetchReservations();
    },
  };
  </script>  
  
  <style scoped>
  .reservations-page {
    background-color: #f7f7f7;
    min-height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }
  
  .content {
    max-width: 900px;
    width: 100%;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .error-message {
    color: #d32f2f;
    font-size: 16px;
    text-align: center;
  }
  
  .loading-message {
    font-size: 18px;
    text-align: center;
    color: #555;
  }
  
  .reservations-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .reservations-table th, .reservations-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .reservations-table th {
    background-color: #d32f2f;
    color: white;
  }
  
  .reservations-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .reservations-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .no-reservations {
    text-align: center;
    color: #555;
    font-size: 16px;
    margin-top: 20px;
  }
  </style>
  
<template>
  <HeaderElement />
  
  <div class="background-overlay">
    <div class="admin-users-page">
      <h2>Gerenciamento de Usuários</h2>
      
      <div v-if="users.length === 0" class="no-users">
        <p>Não há usuários registrados.</p>
      </div>

      <div v-else class="user-table-container">
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="{'status-active': user.active, 'status-inactive': !user.active}">
                  {{ user.active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td>
                <div class="button-group">
                  <button class="edit-button" @click="openEditModal(user)">Editar</button>
                  <button class="toggle-button" @click="toggleUserStatus(user)">
                    {{ user.active ? 'Desativar' : 'Ativar' }}
                  </button>
                  <button class="delete-button" @click="deleteUser(user._id)">Excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal de Edição -->
  <div v-if="isEditModalOpen" class="modal">
    <div class="modal-content">
      <h3>Editar Usuário</h3>
      <form @submit.prevent="updateUser">
        <label for="username">Nome:</label>
        <input type="text" id="username" v-model="editUserData.username" required />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editUserData.email" required />

        <label for="active">Status:</label>
        <select id="active" v-model="editUserData.active">
          <option :value="true">Ativo</option>
          <option :value="false">Inativo</option>
        </select>

        <div class="modal-buttons">
          <button type="submit">Salvar</button>
          <button type="button" @click="closeEditModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <FooterElement />
</template>


<script>
import axios from 'axios';
import HeaderElement from "@/components/HeaderElement.vue";
import FooterElement from "@/components/FooterElement.vue";

export default {
  components: {
    HeaderElement,
    FooterElement
  },
  data() {
    return {
      users: [], // Armazena todos os usuários
      isEditModalOpen: false, // Controle de exibição do modal
    editUserData: null, // Dados do usuário em edição
    };
  },
  created() {
    this.fetchUsers(); // Carregar usuários quando o componente for criado
  },
  methods: {
    // Método para buscar os usuários
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Erro ao carregar a lista de usuários.");
      }
    },

    openEditModal(user) {
    this.editUserData = { ...user }; // Clona os dados do usuário para edição
    this.isEditModalOpen = true;
  },

  closeEditModal() {
    this.editUserData = null;
    this.isEditModalOpen = false;
  },

  async updateUser() {
    try {
      const { _id, username, email, active } = this.editUserData;
      await axios.put(`http://localhost:5000/api/users/${_id}`, {
        username,
        email,
        active,
      });

      alert("Usuário atualizado com sucesso!");
      this.closeEditModal();
      this.fetchUsers(); // Recarrega a lista de usuários
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar os dados do usuário.");
    }
  },

    // Método para alternar status do usuário (Ativar/Desativar)
    async toggleUserStatus(user) {
      try {
        const updatedStatus = !user.active;
        await axios.patch(`http://localhost:5000/api/users/${user._id}`, {
          active: updatedStatus
        });
        user.active = updatedStatus; // Atualiza o status no frontend
        alert(`Usuário ${updatedStatus ? 'ativado' : 'desativado'} com sucesso!`);
      } catch (error) {
        console.error("Erro ao alterar status do usuário:", error);
        alert("Erro ao atualizar o status do usuário.");
      }
    },

    // Método para excluir um usuário
    async deleteUser(userId) {
      if (confirm("Tem certeza de que deseja excluir este usuário?")) {
        try {
          await axios.delete(`http://localhost:5000/api/users/${userId}`);
          this.fetchUsers();
          alert("Usuário excluído com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir usuário:", error);
          alert("Erro ao excluir o usuário.");
        }
      }
    }
  }
};
</script>

<style scoped>
/* Div de fundo escuro */
.background-overlay {
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Reduz o espaçamento no topo */
  padding: 10px;
}

/* Div do conteúdo centralizado */
.admin-users-page {
  max-width: 1000px; /* Aumenta o tamanho da tabela */
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px; /* Reduz um pouco o tamanho do título */
  font-weight: 600;
  text-transform: uppercase;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Tabela de usuários */
.user-table-container {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px; /* Reduz o espaço entre o título e a tabela */
}

.user-table th, .user-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.user-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

/* Botões e espaçamento */
.button-group {
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
}

/* Botões com cores distintas */
.edit-button {
  background-color: #4CAF50; /* Verde */
  color: white;
}

.toggle-button {
  background-color: #1976D2; /* Azul */
  color: white;
}

.delete-button {
  background-color: #D32F2F; /* Vermelho */
  color: white;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

/* Status do usuário */
.status-active {
  color: green;
  font-weight: bold;
}

.status-inactive {
  color: red;
  font-weight: bold;
}

/* Responsividade */
@media (max-width: 768px) {
  .admin-users-page {
    width: 90%;
    padding: 15px;
  }
}
</style>

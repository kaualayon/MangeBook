<template>
  <div class="login-form-container">
    <div class="login-header">
      <h2>Entrar</h2>
      <p>Bem-vindo de volta! Por favor, insira suas credenciais.</p>
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <label for="email">E-mail</label>
      <input type="text" id="email" v-model="formData.email" placeholder="Digite seu e-mail" required>

      <label for="password">Senha</label>
      <input type="password" id="password" v-model="formData.password" placeholder="Digite sua senha" required>

      

      <input type="submit" value="Entrar" :disabled="loading">
    </form>

    <div class="message">
      <p>Ainda não tem uma conta? <router-link to="/">Cadastre-se</router-link></p>
    </div>

    <!-- Mensagem de erro -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",

  data() {
    return {
      formData: {
        email: "",
        password: "",
        role: "", // Adicionado o campo role
      },
      loading: false,
      errorMessage: "", // Armazena mensagens de erro
    };
  },

  methods: {
    async handleLogin() {
      try {
        // Envia a requisição para o backend com email, senha e role
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.formData.email,
          password: this.formData.password,
          role: this.formData.role, // Envia o tipo de usuário
        });

        // Verifica se a resposta contém um token (sucesso no login)
        if (response.status === 200 && response.data.token) {
          const user = response.data.user;

          // Salva o token e as informações do usuário no localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userId", user._id); // Armazena o ID do usuário separadamente

          // LOG DE DEPURAÇÃO
          console.log("User info from backend:", user);

         // Verifica o papel retornado do backend
      if (user.role === "admin") {
        this.$router.push("/home");
        alert("Login bem-sucedido como Administrador!");
      } else if (user.role === "user") {
        this.$router.push("/home");
        alert("Login bem-sucedido como Usuário Normal!");
      } else {
        alert("Função de usuário desconhecida!");
      }
    
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro ao realizar o login. Verifique suas credenciais.";
      }
    },
  },
};
</script>


<style scoped>
/* Estilo para o container do formulário de login */
.login-form-container {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Tamanho máximo do container */
  margin: 40px auto; /* Espaço de 40px acima e abaixo, e centraliza o formulário horizontalmente */
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  margin-bottom: 10px;
  color: #333;
  font-size: 1.8em;
}

.login-header p {
  color: #777;
  font-size: 1.1em;
}

/* Estilo para o formulário de login */
.login-form {
  display: flex;
  flex-direction: column;
}

.login-form label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  font-size: 0.9em;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.login-form input[type="text"]:focus,
.login-form input[type="password"]:focus {
  border-color: #D32F2F; /* Cor do foco vermelha */
  box-shadow: 0 0 5px rgba(211, 47, 47, 0.3); /* Sombra vermelha */
  outline: none;
}

.login-form input[type="submit"] {
  background-color: #D32F2F; /* Vermelho claro */
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.login-form input[type="submit"]:hover {
  background-color: #B71C1C; /* Tom mais escuro de vermelho para hover */
  transform: translateY(-2px); /* Efeito de subida */
}

.login-form input[type="submit"]:active {
  transform: translateY(0); /* Efeito de clique */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra leve ao clicar */
}

.login-form input[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilo para a mensagem de login */
.message {
  margin-top: 20px;
  text-align: center;
}

.message p {
  color: #777;
  font-size: 1em;
}

.message a {
  color: #D32F2F; /* Vermelho */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.message a:hover {
  text-decoration: underline;
}

/* Estilo para a mensagem de erro */
.error-message {
  color: red;
  font-size: 1em;
  text-align: center;
  margin-top: 15px;
}
</style>

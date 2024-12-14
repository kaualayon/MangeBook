<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h2>MANGE BOOK</h2>
      </div>
      <div class="footer-links">
        <ul>
          <li><router-link to="/home">Dashboard</router-link></li>
          <li><router-link to="/reservas">Minhas reservas</router-link></li>
        <li><router-link to="/favorites">Favoritos</router-link></li>
        <li><router-link to="/notificacao">Notificações</router-link></li>
        <li><router-link to="/config">Configurações</router-link></li>
        <li><router-link to="/relatorios">Relatórios e estatísticas</router-link></li>
        <li><router-link to="/perfil">Conta</router-link></li>
        <li><router-link to="/sobre">Sobre</router-link></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 MANGE BOOK. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterElement",
};
</script>

<style scoped>
/* Estilo geral do Footer */
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  text-align: center;
}

/* Conteúdo principal do footer */
.footer-content {
  display: flex;
  justify-content: space-between; /* Faz a logo ir para a esquerda e os links para a direita */
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
}

/* Logo do footer */
.footer-logo {
  text-align: left;
  width: 100%; /* Garante que a logo ocupe a largura disponível */
}

.footer-logo h2 {
  font-size: 24px;
  font-weight: bold;
  color: #d32f2f;
  margin: 0;
}

/* Links do footer */
.footer-links {
  width: 100%; /* Garante que os links ocupem a largura disponível */
  text-align: center; /* Centraliza os links */
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 15px;
  justify-content: center; /* Centraliza os links na tela */
}

.footer-links a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #d32f2f;
}

/* Rodapé inferior */
.footer-bottom {
  margin-top: 20px;
  font-size: 14px;
  color: #bbb;
}

/* Responsividade */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-links ul {
    flex-direction: column;
    align-items: center;
  }

  .footer-logo {
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>

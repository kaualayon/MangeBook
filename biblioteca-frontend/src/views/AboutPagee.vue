<template>
    <!-- Header -->
    <HeaderElement />

    <div class="about-page">
  
      <!-- Título Principal -->
      <div class="about-title">
        <h1>Sobre a MANGE BOOK</h1>
      </div>
  
      <!-- Seção de Introdução -->
      <div class="about-container">
        <section class="about-intro">
          <p>
            A <strong>MANGE BOOK</strong> é uma plataforma inovadora de gestão de livros e bibliotecas, criada para conectar leitores, administradores e conhecimento. Com foco em simplicidade e eficiência, oferecemos ferramentas modernas para reserva, catalogação e acompanhamento de coleções literárias.
          </p>
        </section>
  
        <!-- Missão, Visão e Valores -->
        <section class="about-mvv">
          <h2>Missão, Visão e Valores</h2>
          <div class="mvv-section">
            <div class="mvv-item">
              <h3>Missão</h3>
              <p>
                Democratizar o acesso ao conhecimento por meio de uma plataforma eficiente e amigável para todos.
              </p>
            </div>
            <div class="mvv-item">
              <h3>Visão</h3>
              <p>
                Ser referência em gestão de bibliotecas e leitura digital, promovendo o amor pelos livros em cada canto do mundo.
              </p>
            </div>
            <div class="mvv-item">
              <h3>Valores</h3>
              <p>
                Inovação, simplicidade, inclusão, sustentabilidade e paixão pela leitura.
              </p>
            </div>
          </div>
        </section>
  
        <!-- História -->
        <section class="about-history">
          <h2>Nossa História</h2>
          <p>
            Fundada em 2024, a <strong>MANGE BOOK</strong> nasceu com o propósito de transformar a forma como bibliotecas e leitores se conectam. Com uma equipe dedicada e apaixonada por tecnologia e literatura, criamos um sistema que facilita a vida de administradores de bibliotecas e promove a cultura da leitura em uma era digital.
          </p>
        </section>
  
        <!-- Serviços Oferecidos -->
        <section class="about-services">
          <h2>O que Oferecemos</h2>
          <ul>
            <li>Reserva e acompanhamento de livros de forma digital.</li>
            <li>Gestão completa de bibliotecas, incluindo empréstimos e devoluções.</li>
            <li>Atualizações em tempo real sobre novas aquisições.</li>
            <li>Relatórios detalhados de uso e estatísticas.</li>
            <li>Conexão com leitores e sugestões personalizadas.</li>
          </ul>
        </section>
  
        <!-- Contato -->
        <section class="about-contact">
          <h2>Entre em Contato</h2>
          <p>
            Tem dúvidas, sugestões ou deseja saber mais? Fale conosco! Estamos disponíveis para atender você através de nossas redes sociais ou pelo email: <a href="mailto:contato@mangebook.com">contato@mangebook.com</a>.
          </p>
        </section>
      </div>
  
      
    </div>

    <!-- Footer -->
    <FooterElement />
  </template>
  
  <script>
  import HeaderElement from "@/components/HeaderElement.vue";
  import FooterElement from "@/components/FooterElement.vue";
  
  export default {
    components: {
      HeaderElement,
      FooterElement,
    },
  };
  </script>
  
  <style scoped>
  .about-page {
    background-color: #f7f7f7;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 10px
  }
  
  .about-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .about-title h1 {
    font-size: 25px;
    font-weight: 600;
    text-transform: uppercase;
    
  }
  
  .about-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .about-container h2 {
    color: #d32f2f;
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .about-container p,
  .about-container ul {
    font-size: 16px;
    color: #333;
    line-height: 1.6;
  }
  
  .mvv-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;
  }
  
  .mvv-item {
    flex: 1 1 200px;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .mvv-item h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .mvv-item p {
    font-size: 14px;
    color: #666;
  }
  
  .about-services ul {
    list-style: none;
    padding: 0;
  }
  
  .about-services li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .about-services li::before {
    content: "✔";
    color: #d32f2f;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .about-contact a {
    color: #d32f2f;
    text-decoration: none;
  }
  
  .about-contact a:hover {
    text-decoration: underline;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .about-container {
      width: 90%;
      padding: 15px;
    }
  
    .mvv-section {
      flex-direction: column;
    }
  }
  </style>
  
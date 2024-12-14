<template>
    <HeaderElement />
  
    <!-- Título fora da div branca -->
    <div class="background-overlay">
      <h2 class="page-title">Relatórios e Estatísticas</h2>
  
      <div class="reports-page">
        <!-- Gráfico de Livros Mais Emprestados -->
        <div class="chart-container">
          <h3>Livros Mais Emprestados</h3>
          <canvas ref="booksChart"></canvas>
        </div>
  
        <!-- Gráfico de Usuários Mais Ativos -->
        <div class="chart-container">
          <h3>Usuários Mais Ativos</h3>
          <canvas ref="usersChart"></canvas>
        </div>
  
        <!-- Botões de Exportação -->
        <div class="export-buttons">
          <button @click="exportPDF">Exportar Relatório em PDF</button>
          <button @click="exportExcel">Exportar Relatório em Excel</button>
        </div>
      </div>
    </div>
  
    <FooterElement />
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto';
  import HeaderElement from "@/components/HeaderElement.vue";
  import FooterElement from "@/components/FooterElement.vue";
  import { jsPDF } from "jspdf";
  import * as XLSX from 'xlsx';
  
  export default {
    components: {
      HeaderElement,
      FooterElement
    },
    data() {
      return {
        booksData: [], // Dados dos livros mais emprestados
        usersData: [] // Dados dos usuários mais ativos
      };
    },
    created() {
      this.fetchReportsData(); // Carregar dados para os gráficos
    },
    methods: {
      async fetchReportsData() {
        try {
          const responseBooks = await axios.get('http://localhost:5000/api/reports/most-borrowed-books');
          this.booksData = responseBooks.data;
  
          const responseUsers = await axios.get('http://localhost:5000/api/reports/most-active-users');
          this.usersData = responseUsers.data;
  
          this.renderCharts(); // Gerar gráficos depois de carregar os dados
        } catch (error) {
          console.error("Erro ao carregar dados dos relatórios:", error);
          alert("Erro ao carregar os dados dos relatórios.");
        }
      },
      renderCharts() {
        // Gráfico de Livros Mais Emprestados
        new Chart(this.$refs.booksChart, {
          type: 'bar',
          data: {
            labels: this.booksData.map(book => book.title),
            datasets: [{
              label: 'Número de Empréstimos',
              data: this.booksData.map(book => book.borrowCount),
              backgroundColor: '#D32F2F',
              borderColor: '#B71C1C',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        // Gráfico de Usuários Mais Ativos
        new Chart(this.$refs.usersChart, {
          type: 'bar',
          data: {
            labels: this.usersData.map(user => user.username),
            datasets: [{
              label: 'Número de Empréstimos',
              data: this.usersData.map(user => user.borrowCount),
              backgroundColor: '#1976D2',
              borderColor: '#1565C0',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      // Função para exportar relatório como PDF
      exportPDF() {
        const doc = new jsPDF();
        doc.text("Relatório de Estatísticas", 10, 10);
        doc.text("Livros Mais Emprestados", 10, 20);
        this.booksData.forEach((book, index) => {
          doc.text(`${book.title}: ${book.borrowCount} empréstimos`, 10, 30 + (index * 10));
        });
  
        doc.text("Usuários Mais Ativos", 10, 50 + (this.booksData.length * 10));
        this.usersData.forEach((user, index) => {
          doc.text(`${user.username}: ${user.borrowCount} empréstimos`, 10, 60 + (this.booksData.length * 10) + (index * 10));
        });
  
        doc.save('relatorio_estatisticas.pdf');
      },
      // Função para exportar relatório como Excel
      exportExcel() {
        const wb = XLSX.utils.book_new();
        const wsBooks = XLSX.utils.json_to_sheet(this.booksData);
        const wsUsers = XLSX.utils.json_to_sheet(this.usersData);
  
        XLSX.utils.book_append_sheet(wb, wsBooks, "Livros Mais Emprestados");
        XLSX.utils.book_append_sheet(wb, wsUsers, "Usuários Mais Ativos");
  
        XLSX.writeFile(wb, 'relatorio_estatisticas.xlsx');
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
  }
  
  /* Título fora da div branca */
  .page-title {
    font-size: 25px;
    font-weight: 600;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
  
  /* Estilo da página de relatórios */
  .reports-page {
    max-width: 800px;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 28px;
    font-weight: 600;
    text-transform: uppercase;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .chart-container {
    margin-bottom: 30px;
  }
  
  .export-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #D32F2F;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #B71C1C;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .reports-page {
      width: 90%;
      padding: 20px;
    }
  }
  </style>
  
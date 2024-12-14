<template>
    <div class="chart-container">
      <h3 class="chart-title">{{ title }}</h3>
      <PieChart :chart-data="data" :options="options" />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default defineComponent({
    name: "CircleChart",
    components: {
      PieChart: Pie
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    }
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 300px;
    height: 300px;
  }
  .chart-title {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
  }
  </style>
  
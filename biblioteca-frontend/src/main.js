import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Certifique-se de que o caminho esteja correto


createApp(App)
  .use(router) // Aqui é onde você deve usar o router
  .mount('#app');

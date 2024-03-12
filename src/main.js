import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);

pinia.use(({ store }) => {
  if (store.$id === 'auth') {
    const authStore = store;
    authStore.checkUser();
  }
});

app.use(pinia);

const $axios = axios.create({
  baseURL: 'http://localhost/'
});

app.config.globalProperties.$axios = $axios;
app.mount('#app');

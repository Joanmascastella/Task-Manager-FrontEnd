import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';

const $axios = axios.create({
  baseURL: 'http://localhost/'
});

//Making authtoken globally accessible
$axios.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

//if the auth token expires then its replaced with the refresh token 
$axios.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const response = await $axios.post('/refresh-token', {
        refreshToken: localStorage.getItem('refreshToken')
      });
      localStorage.setItem('authToken', response.data.autToken);
      $axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.authToken}`;
      return $axios(originalRequest);
    } catch (e) {
      console.error('Unable to refresh token', e);
    }
  }
  return Promise.reject(error);
});


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.config.globalProperties.$axios = $axios;

app.mount('#app');

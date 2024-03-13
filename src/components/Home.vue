<template>
  <div>
    <div v-if="!authStore.token" class="landing-page">
      <h1>Welcome to the Task Manager</h1>
      <p>Are you ready to organize your future? Please <router-link to="/login">login</router-link> or <router-link
          to="/register">register</router-link> to continue.</p>
    </div>

    <div v-else-if="authStore.user && authStore.user.role === 'admin'" class="analytics-container">
      <AdminDashboard />
    </div>

    <div v-else-if="authStore.user && authStore.user.role === 'user'" class="A-Container">
      <h1 class="welcome-message">Welcome, {{ authStore.user.username }}.</h1>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth.js';
import AdminDashboard from '@/components/dashboard/AdminDashboard.vue';

export default {
  name: "Home",
  components: {
    AdminDashboard,
  },
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #F3F2F4;
  height: 100vh;
}

.landing-page {
  background-image: url('../assets/img/giphy.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.landing-page::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

h1,
p {
  color: white;
  position: relative;
  z-index: 1;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
}

.router-link {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: #0056b3;
  margin: 0 5px;
}

.router-link:hover {
  color: #00376b;
  background-color: #e0e0e0;
}

.A-Container {
  text-align: center;
  padding: 20px;
}

.welcome-message {
  margin-bottom: 20px;
  color: #000000;
}

</style>

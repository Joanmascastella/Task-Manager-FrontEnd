<template>
  <div class="parent">
    <div class="login-container">
      <form @submit.prevent="onSubmit">
        <h1 class="mb-4">Login</h1>
        <div class="mb-3">
          <label for="InputEmail" class="form-label">Email address</label>
          <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" v-model="inputEmail">
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="InputPassword" v-model="inputPassword">
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Login</button>
          <router-link to="/register" class="btn btn-outline-primary">Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth.js';

export default {
  name: "Login",
  data() {
    return {
      inputEmail: '',
      inputPassword: ''
    };
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore
    };
  },
  methods: {
    async onSubmit() {
      const loginData = {
        email: this.inputEmail,
        password_hash: this.inputPassword,
      };

      try {
        const response = await this.$axios.post('/login', loginData);
        this.authStore.setUser({
          authToken: response.data.authToken,
          refreshToken: response.data.refreshToken,
          id: response.data.id, 
          username: this.inputEmail,
          role: response.data.role, 
        });
        this.$router.push('/');
      } catch (error) {
        console.error("Login error:", error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.parent {
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
}

.login-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 50%;
  max-width: 600px;
  min-width: 300px;
  text-align: center;
  margin: 0 auto;
}

.form-label {
  display: block;
  color: #212529;
  margin-bottom: 0.5rem;
}

.form-control {
  width: calc(100% - 1.5rem);
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
}

.btn-primary,
.btn-outline-primary {
  width: 48%;
  margin-top: 1rem;
}

.d-flex {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

@media (max-width: 768px) {
  .login-container {
    width: 80%;
    padding: 20px;
  }
}
</style>

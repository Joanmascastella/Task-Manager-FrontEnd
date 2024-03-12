<template>
  <div class="container my-5">
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
        this.authStore.setUser(response.data);
        this.$router.push('/');
      } catch (error) {
        console.error("Login error:", error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #333;
}

.btn-primary {
  width: 48%;
}

.btn-outline-primary {
  width: 48%;
}

.d-flex {
  gap: 10px;
}
</style>
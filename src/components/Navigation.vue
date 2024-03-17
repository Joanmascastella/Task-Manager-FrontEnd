<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Task Manager</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcollapsible"
        aria-controls="navcollapsible" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcollapsible">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="authStore.user && authStore.user.role === 'user'" class="nav-item" style="color: white;">
            <router-link to="/list-dashboard" class="nav-link" active-class="active">List Dashboard</router-link>
         
          </li>
          <li v-if="authStore.user && authStore.user.role === 'user'" class="nav-item">
            <router-link to="/user-dashboard" class="nav-link" active-class="active">User Dashboard</router-link>
          </li>
          <li v-if="authStore.user" class="nav-item">
            <a class="nav-link btn btn-danger" style="color: white;" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/store/auth.js';
import { useRouter } from 'vue-router'; 

export default {
  name: "Navigation",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); 

    const logout = () => {
      authStore.logout();
      router.push('/'); 
    };

    return { authStore, logout };
  },
};
</script>

<style scoped>

.navbar {
  background-color: #343a40;
  padding: 0.5rem 1rem;
  border-bottom: 3px solid #ff385c;
}
.navbar-brand {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}
.navbar-brand:hover {
  color: #ddd;
}

</style>



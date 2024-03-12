<template>
  <nav class="navbar navbar-expand-md navbar-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Task Manager</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcollapsible"
        aria-controls="navcollapsible" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcollapsible">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" active-class="active" href="/">Home</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
      
          <li v-if="authStore.user && authStore.user.role === 'admin'" class="nav-item">
            <a class="nav-link" active-class="active" href="/admin-dashboard">Admin Dashboard</a>
          </li>
          <li v-if="authStore.user && authStore.user.role === 'user'" class="nav-item">
            <a class="nav-link" active-class="active" href="/user-dashboard">User Dashboard</a>
          </li>
          <li v-if="authStore.user" class="nav-item btn btn-danger">
            <a class="nav-link" active-class="active" @click="logout">Logout</a>
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

.navbar
 {
  background-color: #000000;
  margin-bottom: 0 !important; 
}



</style>


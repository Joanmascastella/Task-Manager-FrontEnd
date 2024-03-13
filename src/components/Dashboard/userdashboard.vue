<template>
  <div class="user-dashboard">
    <div v-if="user.user_id">
      <div class="user-container">
        <h1 class="mb-4">User Dashboard</h1>
        <div class="mb-3">
          <label for="InputName" class="form-label">Change Name</label>
          <input type="text" class="form-control" id="InputName" aria-describedby="nameHelp" v-model="user.name">
        </div>
        <div class="mb-3">
          <label for="InputEmail" class="form-label">Change Email address</label>
          <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" v-model="user.email">
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="updateDetails">Update Details</button>
          <button type="button" class="btn btn-danger" @click="deleteAccount(user.user_id)">Delete Account</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth.js';

export default {
  name: "UserDashboard",

  data() {
    return {
      user: {
        user_id: 0,
        email: "",
        name: "",
      }
    };
  },
  methods: {
    updateDetails() {
      this.$axios.put("/user/update/" + this.user.user_id, this.user)
        .then(response => {
          this.$router.push('/user-dashboard');
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteAccount(user_id) {
      this.$axios.delete("/user/delete/" + user_id)
        .then(response => {
          const authStore = useAuthStore();
          authStore.logout(); 
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  mounted() {
    const authStore = useAuthStore();
    const userId = authStore.userId;

    if (userId) {
      this.$axios.get("/user/" + userId)
        .then((res) => {
          this.user = res.data;
        })
        .catch((error) => console.log(error));
    } else {
      console.log('No user ID found in auth store.');
    }
  }
};
</script>


<style>
.user-dashboard {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #F3F2F4;
  height: 100vh;
  color: #333;
  font-family: 'Helvetica', 'Arial', sans-serif;
}

.user-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  max-width: 500px;
  margin: auto;
}

h1 {
  color: #4A4A4A;
  margin-bottom: 1.5rem;
}

.form-label {
  color: #4A4A4A;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary {
  background-color: #5C6BC0;
  color: white;
}

.btn-danger {
  background-color: #EF5350;
  color: white;
}

.btn-primary:hover,
.btn-danger:hover {
  opacity: 0.9;
}

.d-flex {
  gap: 1rem;
}

@media (max-width: 768px) {
  .user-container {
    width: 90%;
    padding: 20px;
  }
}
</style>

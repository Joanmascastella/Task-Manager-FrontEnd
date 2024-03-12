<template>
  <div class="container my-5">
    <form @submit.prevent="onSubmit">
      <h1 class="mb-4">Register</h1>
      <div class="mb-3">
        <label for="InputName" class="form-label">Name</label>
        <input type="text" class="form-control" id="InputName" v-model="name">
      </div>
      <div class="mb-3">
        <label for="InputEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="InputEmail" v-model="email">
      </div>
      <div class="mb-3">
        <label for="InputPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="InputPassword" v-model="password">
      </div>
      <div class="mb-3">
        <label for="InputConfirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="InputConfirmPassword" v-model="confirmPassword">
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Register</button>
        <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  name: "Register",
  data() {
    return {
      name: '', 
      email: '',
      password: '', 
      confirmPassword: '',
      role: 'user'
    };
  },
  methods: {
    onSubmit() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const userData = {
        name: this.name,
        email: this.email,
        password_hash: this.password, 
        role: this.role 
      };
      this.$axios.post('/register', userData)
        .then(response => {
          console.log(response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          console.error("There was an error in the registration process:", error.response);
        });
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
<template>
  <div class="parent">
    <div class="form-container">
      <form @submit.prevent="onSubmit">
        <h1 class="mb-4">Register</h1>
        <div class="mb-3">
          <label for="InputName" class="form-label">Name</label>
          <input type="text" class="form-control" id="InputName" v-model="name" required>
        </div>
        <div class="mb-3">
          <label for="InputEmail" class="form-label">Email address</label>
          <input type="email" class="form-control" id="InputEmail" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="InputPassword" v-model="password" required>
        </div>
        <div class="mb-3">
          <label for="InputConfirmPassword" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="InputConfirmPassword" v-model="confirmPassword" required>
        </div>
        <div v-if="feedbackMessage" :class="['feedback', { 'success': isSuccess, 'error': !isSuccess }]">
          {{ feedbackMessage }}
        </div>
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Register</button>
          <router-link to="/login" class="btn btn-outline-primary">Login</router-link>
        </div>
      </form>
    </div>
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
      role: 'user',
      feedbackMessage: '',
      isSuccess: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.password !== this.confirmPassword) {
        this.feedbackMessage = "Passwords do not match!";
        this.isSuccess = false;
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
          if (response.data) {
            this.feedbackMessage = "Registration successful. Redirecting to login...";
            this.isSuccess = true;
            this.$router.push('/login');
          } else {
            this.feedbackMessage = "Registration Failed.";
            this.isSuccess = false;
          }
        })
        .catch(error => {
          this.feedbackMessage = "Email already in use";
          this.isSuccess = false;
        });
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
  margin-top: 0px;
  margin-bottom: 30px;
}

.form-container {
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
  .form-container {
    width: 80%;
    padding: 20px;
  }
}
</style>

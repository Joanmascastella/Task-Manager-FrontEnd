import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData.user; 
      this.token = userData.jwt; 
      localStorage.setItem('authToken', userData.jwt); 
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
      // Redirect to login or perform other cleanup actions
    },
    checkUser() {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Optionally verify token validity with backend
        this.token = token;
        // Set user data if necessary
      }
    },
  }
});

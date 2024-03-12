import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData; 
      this.token = userData.jwt;
      localStorage.setItem('authToken', userData.jwt);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
    },
    checkUser() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
      }
    },
    getters: {
        isAdmin: (state) => state.user?.role === 'admin',
        isUser: (state) => state.user?.role === 'user',
      },
  }
});

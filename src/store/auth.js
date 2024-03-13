import { defineStore } from 'pinia';

function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userData) {

      this.user = {
        jwt: userData.jwt,
        id: userData.user_id,
        username: userData.username,
        role: userData.role,
      };
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
        try {
          const decoded = decodeToken(token);
          this.user = {
            jwt: token,
            id: decoded.data.user_id,
            username: decoded.data.username,
            role: decoded.data.role,
          };
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    },


  },
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isUser: (state) => state.user?.role === 'user',
  },
});

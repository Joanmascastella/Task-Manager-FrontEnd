<template>
    <div class="total-tasks">
      <h3>Total Tasks: {{ totalTasks }}</h3>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/store/auth.js';
  
  export default {
    name: 'TotalTasks',
    data() {
      return {
        totalTasks: 0
      };
    },
    methods: {
      fetchTotalTasks(userId) {
        this.$axios.get(`/analytics/tasks/${userId}`).then(response => {
          this.totalTasks = response.data;
        }).catch(error => {
          console.error("Failed to get total tasks", error);
        });
      }
    },
    mounted() {
      const authStore = useAuthStore();
      const userId = authStore.userId;
      if (userId) {
        this.fetchTotalTasks(userId);
      }
    }
  };
  </script>
  
  
  <style scoped>
  .total-tasks {
    background-color: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  
  .total-tasks:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
  
  h3 {
    color: #333;
    font-weight: bold;
  }
  </style>
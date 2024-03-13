<template>
  <div class="active-users">
    <h3>Active Users: {{ activeUsers }}</h3>
  </div>
</template>

<script>
export default {
  name: 'ActiveUsers',
  data() {
    return {
      activeUsers: 0
    };
  },
  methods: {
    fetchActiveUsers() {
      // Assuming you're using Axios for HTTP requests
      this.$axios.get("/analytics/users").then(response => {
        this.activeUsers = response.data;
      }).catch(error => {
        console.error("Failed to get active users", error);
      });
    }
  },
  mounted() {
    this.fetchActiveUsers();
  }
};
</script>

<style scoped>
.active-users {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.active-users:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

h3 {
  color: #333;
  font-weight: bold;
}
</style>

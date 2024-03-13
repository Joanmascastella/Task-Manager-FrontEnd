<template>
  <div class="completed-tasks">
    <h3>Completed Tasks: {{ completedTasks }}</h3>
    <h4>Completion Rate: <span class="completion-rate">{{ completionRate }}%</span></h4>
  </div>
</template>

<script>
export default {
  name: 'CompletedTasks',
  data() {
    return {
      completedTasks: 0,
      completionRate: 0
    };
  },
  methods: {
    fetchCompletedTasks() {
      this.$axios.get("/analytics/tasks/completed").then(response => {
        this.completedTasks = response.data.completed;
        this.completionRate = response.data.percentage.toFixed(2);
      }).catch(error => {
        console.error("Failed to get completed tasks", error);
      });
    }
  },
  mounted() {
    this.fetchCompletedTasks();
  }
};
</script>

<style scoped>
.completed-tasks {
  
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.completed-tasks:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

h3 {
  color: #333;
  font-weight: bold;
}

h4 {
  color: #555;
}

.completion-rate {
  color: #4CAF50;
  font-weight: bold;
  display: inline-block;
  transition: transform 0.3s ease;
}

.completion-rate:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>

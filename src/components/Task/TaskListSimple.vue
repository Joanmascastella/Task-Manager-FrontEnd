<template>
  <div class="task-container overflow-auto p-3 bg-light shadow rounded" style="max-height: 300px;">
    <div v-if="!tasks.length">
      <h3>No Tasks Associated To This List.</h3>
    </div>
    <div v-for="(task, index) in tasks" :key="task.task_id"
      :class="['task-item', 'row', { 'bg-white': index % 2 === 0, 'bg-secondary bg-opacity-10': index % 2 !== 0 }]">
      <div class="col-12 d-flex align-items-center">
        <input type="checkbox" :checked="task.status === 'completed'" class="form-check-input me-2"
          @change="toggleTaskStatus(task)" />
        <span class="flex-grow-1">{{ task.title }}</span>
        <button class="btn btn-primary" @click.prevent="viewDetails(task)">View</button>
      </div>
    </div>
    <TaskDetails v-if="showTaskPopup" :is-visible="showTaskPopup" :task="selectedTask" @close="cancelTaskList" />
  </div>
</template>

<script>
import TaskDetails from '@/components/Task/TaskDetails.vue';
export default {
  name: "TaskListSimple",
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showTaskPopup: false,
      selectedTask: Object,
    };
  },
  components: {
    TaskDetails,
  },
  methods: {
    toggleTaskStatus(task) {
      const taskId = task.task_id;
      const status = task.status === 'completed' ? 'pending' : 'completed';

      this.$axios.put(`/tasks/${taskId}/${status}`)
        .then(response => {
        })
        .catch((error) => {
          console.error(error);
        });
    },
    viewDetails(task) {
      this.selectedTask = task;
      this.showTaskPopup = true;
    },

    cancelTaskList() {
      this.showTaskPopup = false;
    },
  }
};
</script>

<style scoped>
.task-container {
  border: 1px solid #000;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 30px;
  margin: 20px auto;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
}

.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
}

.task-details {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.task-details input[type="checkbox"] {
  margin-right: 10px;
}
</style>
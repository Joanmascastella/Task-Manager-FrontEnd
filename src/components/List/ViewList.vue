<template>
    <div class="col-12 bg-white border rounded shadow-sm" style="text-align: center;">
      <div v-if="list">
        <div style="margin: 30px;">
          <h2>List: {{ list.listname }}</h2>
        </div>
        <div v-if="!list.tasks || list.tasks.length === 0" style="margin: 30px;">
          <h4>No Tasks Associated To This List.</h4>
        </div>
        <div v-else  style="margin: 30px;">
          <TaskListSimple :tasks="list.tasks" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TaskListSimple from '@/components/Task/TaskListSimple.vue';
  
  export default {
    name: "ViewList",
    components: {
      TaskListSimple
    },
    props: {
      list: Object
    }
  }
  </script>
  
  <style scoped>
  </style>
  
<template>
    <div class="container-fluid d-flex justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 bg-white border rounded shadow-sm p-4" style="text-align: center;">
        <div v-if="listItems.length > 0">
          <div style="margin: 30px;">
            <h2>Shared List: {{ listItems[0].listname }}</h2>
          </div>
          <div v-if="listItems.length === 0" style="margin: 30px;">
            <h4>No Tasks Associated To This List.</h4>
          </div>
          <div v-else style="margin: 30px;">
            <TaskListSimple :tasks="listItems" /> 
          </div>
        </div>
        <div v-else>
          <h4>Loading...</h4>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TaskListSimple from '@/components/Task/TaskListSimple.vue';
  export default {
    name: "ShareList",
    components: {
      TaskListSimple
    },
    data() {
      return {
        listItems: []
      };
    },
    methods: {
      getList(listId) {
        this.$axios.get("/share/list/" + listId)
          .then(response => {
            this.listItems = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
    mounted() {
      const listId = this.$route.params.listId;
      console.log("List ID:", listId);
      this.getList(listId);
    },
  }
  </script>
  
  <style scoped>
  .container-fluid {
    width: 100%;
  }
  </style>
  
<template>
    <section>
      <div class="container">
        <h1 v-if="login">Welcome {{ user.username }}</h1>
        <h1 v-else>Welcome</h1>
        <TaskView />
      </div>
    </section>
  </template>
  
  <script>
  
  export default {
    name: "Home",
 
    props: {
      user: Object
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9; 
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); 
  }
  
  h1 {
    color: #000000;
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin-bottom: 20px; 
  }
  </style>
  
  
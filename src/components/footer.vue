<template>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          © 2024 Task Manager. All rights reserved.
        </p>
        <p>
          <a href="#">About Us</a> | 
          <a href="#">Terms of Service</a> | 
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 1rem 0;
    background-color: #000000;
    text-align: center;
    border-top: 1px solid #000000;
    color: white;
  }
  
  .content p {
    margin: 0.5rem 0;
  }
  
  a {
    color: #3273dc;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  
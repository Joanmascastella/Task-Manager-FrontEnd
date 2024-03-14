<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        © 2024 Task Manager. All rights reserved.
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
  width: 100%;
  padding: 0.3rem 0;
  background-color: #000000;
  text-align: center;
  border-top: 1px solid #000000;
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;
}

.content {
  margin-bottom: 0px;
}

.content.has-text-centered {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

a {
  color: #3273dc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

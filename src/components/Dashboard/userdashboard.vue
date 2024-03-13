<template>
  <h1>user</h1>
</template>

<script>


export default {
  name: "UserDashboard",

  data() {
    return {
      user: {
        user_id: 0,
        email: "",
        name: "",
        role: "",
      }

    };
    
  },
  mounted() {
    //get user id from authstore
    this.$axios.get("/user/" + 9)
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => console.log(error));

  }
}
</script>

<style></style>
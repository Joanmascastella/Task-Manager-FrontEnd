<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/footer.vue'

export default {
  name: "App",
  components: {
    Navigation,
    Footer

  }
};
</script>

<template>
  <navigation />
  <router-view></router-view>
  <Footer/>
</template> 

<style scoped>
</style>

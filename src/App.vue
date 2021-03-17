<template>
  <v-app
      style="
      background: teal;
      background: -webkit-linear-gradient(to right, #008080, #6DF3F3, #008080);
      background: linear-gradient(to right, #008080, #6DF3F3, #008080);"
  >
    <Nav/>
    <v-main class="main">
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
  name: 'App',
  components: {
    Nav,
    Footer
  }
});
</script>

<style>
</style>
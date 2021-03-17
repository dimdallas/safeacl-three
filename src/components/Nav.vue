<template>
  <v-app-bar app dark color="teal">
    <v-toolbar-title>SafeACL</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text rounded>Home</v-btn>
    <v-btn to="/login" text rounded v-if="auth" @click="logout">Logout</v-btn>
    <v-btn to="/login" text rounded v-if="!auth">Login</v-btn>
    <v-btn to="/signup" text rounded v-if="!auth">Sign Up</v-btn>
    <v-btn text rounded disabled>About</v-btn>
    <v-btn text rounded disabled>Contact us</v-btn>
  </v-app-bar>
</template>

<script>
import store from "@/store/index";

export default {
  name: "Nav",
  data(){
    return{
      auth:this.authCompute()
    }
  },
  methods: {
    async logout() {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });

      await store.dispatch('setAuth', false);
    },
    authCompute() {
      return store.state.authenticated;
    }
  }
}
</script>
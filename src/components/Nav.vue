<template>
  <v-app-bar clipped-left app dark color="teal">
    <v-toolbar-title>SafeACL</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text rounded>Home</v-btn>
    <v-btn to="/patient" text rounded>Patient</v-btn>
    <v-btn to="/three" text rounded>Three</v-btn>
    <!-- <v-btn to="/login" text rounded v-if="auth" @click="logout">Logout</v-btn> -->
    <v-btn to="/login" text rounded>Login</v-btn>
    <v-btn to="/signup" text rounded>Sign Up</v-btn>
    <v-btn text rounded disabled>About</v-btn>
    <v-btn text rounded disabled>Contact us</v-btn>
  </v-app-bar>
</template>

<script>
import store from "@/store/index";

export default {
  name: "Nav",
  data() {
    return {
      auth: this.authCompute(),
    };
  },
  methods: {
    async logout() {
      await fetch("http://localhost:5001/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      await store.dispatch("setAuth", false);
    },
    authCompute() {
      return store.state.authenticated;
    }
  },
};
</script>
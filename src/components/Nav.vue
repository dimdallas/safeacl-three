<template>
  <v-app-bar clipped-left app dark color="teal">
    <v-toolbar-title>SafeACL</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/patients" text rounded>Home</v-btn>
    <!-- <v-btn to="/patient" text rounded>Patient</v-btn>
    <v-btn to="/three" text rounded>Three</v-btn> -->
    <!-- <div v-if="authCompute"> -->
    <div >
      <v-btn to="/authentication" text rounded>Login/Signup</v-btn>
      <!-- <v-btn to="/signup" text rounded>Sign Up</v-btn> -->
    </div>
    <!-- <div v-else>
      <v-btn to="/login" text rounded @click="logout">Logout</v-btn>
    </div> -->
    <v-btn to="/profile" text rounded>Profile</v-btn>
    <v-btn to="/about" text rounded>About SafeACL</v-btn>
  </v-app-bar>
</template>

<script>
import store from "@/store/index";

export default {
  name: "Nav",
  data() {
    return {
      auth: this.authCompute,
    };
  },
  methods: {
    async logout() {
      // await fetch("http://10.64.92.213:5001/auth/logout", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      // });
      
      await store.dispatch("set_Auth", false).then(console.log("dispatched from logout"))
      // await store.actions.set_Auth(false);
    }
  },
  computed: {
    authCompute() {
      // console.log(store.state.authenticated)
      return store.state.authenticated;
    }
  }
};
</script>
<template>
  <v-main>
    <side-nav/>
    <v-card width="500" class="teal mx-auto corrected">
      <v-card-title class="white--text">Home</v-card-title>
      <v-card-text class="white--text">
        {{ message }}
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import store from "@/store/index";
import SideNav from '../components/SideNav.vue'

export default {
  components: { SideNav },
    name:"Overview",
    data() {
    return {
      message: "",
    };
  },
  methods: {
    async init() {
      try {
        const localstorageUser = JSON.parse(localStorage.getItem("user"));
        const inMemoryToken = localstorageUser.token;
        const response = await fetch("http://10.64.92.213:8883/users/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: inMemoryToken,
          },
        });

        if (response.status != 200) {
          throw Error;
        }
        const content = await response.json();
        console.log(content);
        /* user:
            address: "Nitlan"
            createdAt: "2021-03-27"
            email: "test1@email.gr"
            name: "member"
            password: 
            phone: "6931231323"
            role: "Member"
            surname: "member"
            updatedAt: "2021-03-27"
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
            username: "member 
        */
        this.message = `Welcome ${content.user.username}`;

        await store
          .dispatch("set_Auth", true)
          .then(console.log("home dispatch"));
        // await store.actions.set_Auth(true);
      } catch (e) {
        this.message = "You are not logged in!";
        await store.dispatch("set_Auth", false);
        // await store.actions.set_Auth(false);
        console.log(e);
      }
    },
  },
  mounted() {
    this.init();
  },
}
</script>

<style>

</style>
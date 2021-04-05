<template>
  <v-main>
    <side-nav />
    <v-card width="500" class="teal mx-auto corrected">
      <v-card-title class="white--text">Home</v-card-title>
      <v-card-text class="white--text">
        {{ message }}
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";

export default {
  components: {
    SideNav,
   },
  name: "Overview",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    getOverview(){
      const inMemoryToken = localStorage.getItem("token");
      // console.log(inMemoryToken)
      this.$store
        .dispatch("getOverview", inMemoryToken)
        .then((response) => {
          console.log("overview  " + response);

          const content = response.json();
          this.message = `Welcome ${content.user.username}`;
        })
        .catch((error) => {
          this.message = "You are not logged in!";
          console.log("overview error");
          console.log(error);
        });
    },
    async init() {
      try {
        const inMemoryToken = localStorage.getItem("token");
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
        // console.log(content);
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
      } catch (e) {
        this.message = "You are not logged in!";
        console.log(e);
      }
    },
  },
  mounted() {
    this.getOverview();
  },
};
</script>

<style>
</style>
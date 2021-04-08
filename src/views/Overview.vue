<template>
  <v-main class="fill-height">
    <side-nav />
    <v-card
      height="90%"
      width="100%"
      class="d-flex flex-column teal darken-4 mx-auto corrected"
    >
      <v-row justify="center" align="center">
        <v-col>
          <v-card-title class="white--text" style="margin-left: 13%">
            {{ message }}
          </v-card-title>
        </v-col>
      </v-row>
      <!-- <v-spacer></v-spacer> -->
      <v-row>
        <!-- <v-spacer></v-spacer> -->
        <v-col>
          <v-card class="red mx-auto" width="200" height="200">
            <v-card-title>Patient</v-card-title>
          </v-card>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-col>
          <v-card class="blue mx-auto" width="200" height="200">
            <v-card-title>Simulation</v-card-title>
          </v-card>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
      </v-row>
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
      patient: Object,
      message: "",
    };
  },
  methods: {
    getOverview() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      // console.log(inMemoryToken)
      this.$store
        .dispatch("getProfile", inMemoryToken)
        .then((response) => {
          // console.log(response);

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
          this.message = `Welcome ${response.data.user.username}`;
        })
        .catch((error) => {
          this.message = "You are not logged in!";
          console.log("overview error");
          console.log(error);
        });
    },
    getPatient() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      // console.log(inMemoryToken)
      this.$store
        .dispatch("getLatestPatient", inMemoryToken)
        .then((response) => {
          console.log(response);

        })
        .catch((error) => {
          console.log("profile error");
          console.log(error);
        });
    },
  },
  mounted() {
    this.getOverview();
    this.getPatient();
  },
};
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
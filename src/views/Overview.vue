<template>
  <v-main class="fill-height">
    <side-nav />
    <v-card
      height="90%"
      width="100%"
      class="d-flex flex-column teal lighten-3 mx-auto corrected"
    >
      <v-row justify="center" align="center">
        <v-col>
          <v-card-title class="black--text" style="margin-left: 13%">
            {{ message }}
          </v-card-title>
        </v-col>
      </v-row>
      <!-- <v-spacer></v-spacer> -->
      <v-row>
        <!-- <v-spacer></v-spacer> -->
        <v-col>
          <patient-card
            :patient="latestPatient"
            :key="latestPatient.id_num"
            @parentFunc="displayProfileEvent"
          />
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
import PatientCard from "../components/PatientCard.vue";
import BackEndApi from "../services/api/backEnd";

export default {
  components: {
    SideNav,
    PatientCard,
  },
  name: "Overview",
  data() {
    return {
      latestPatient: {},
      message: "",
    };
  },
  methods: {
    getOverview() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        console.log(inMemoryToken);
        this.$router.push("/authentication");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: inMemoryToken,
        },
      };

      BackEndApi.getCalls("/users/profile", config)
        .then((response) => {
          this.message = `Welcome ${response.data.user.username}`;
        })
        .catch((error) => {
          this.message = "You are not logged in!";
          console.log("overview error");
          console.log(error.response.data.message);
          // localStorage.removeItem("token")
          this.$store.dispatch("deleteToken").then(() => {
            console.log("removed old token");
          });
          this.$router.push("/authentication");
        });
    },
    getPatient() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: inMemoryToken,
        },
      };

      BackEndApi.getCalls("/patients", config)
        .then((response) => {
          const patients = response.data.message;

          // patients.sort(function (a, b) {
          //   // Turn your strings into dates, and then subtract them
          //   // to get a value that is either negative, positive, or zero.
          //   return new Date(b.updatedAt) - new Date(a.updatedAt);
          // });

          var patient = patients[0];
          patients.forEach((element) => {
            if (element.updatedAt > patient.updatedAt) {
              patient = element;
            }
          });

          this.latestPatient = patient;
        })
        .catch((error) => {
          console.log("getPatient error");
          console.log(error.response.data.message);
        });
    },
    displayProfileEvent(valueFromChild) {
      console.log("from child " + valueFromChild);

      console.log(this.latestPatient);
      // this.step++;
    },
  },
  mounted() {
    this.getOverview();
    this.getPatient();
  },
};
</script>

<style>
</style>
<template>
  <v-main class="fill-height">
    <side-nav />
    <v-card
      height="90%"
      width="100%"
      class="flex-column teal lighten-3 mx-auto corrected"
    >
      <v-row>
        <v-col>
          <v-card-title>
            My patients
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-data-table
            :items="patientList"
            :headers="headers"
            :items-per-page="5"
            :search="search"
            item-key="name"
            class="elevation-5 teal lighten-4"
            :footer-props="{
              showFirstLastPage: true,
              firstIcon: 'mdi-arrow-collapse-left',
              lastIcon: 'mdi-arrow-collapse-right',
              prevIcon: 'mdi-arrow-left',
              nextIcon: 'mdi-arrow-right',
            }"
          >
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";
// import PatientEntry from "./PatientEntry.vue";

export default {
  components: {
    SideNav,
    // PatientEntry,
  },
  name: "PatientsTable",
  data() {
    return {
      search: "",
      loading: false,
      headers: [
        // { text: "PICTURE", align: "right", sortable: false, value: "picture" },
        { text: "PICTURE", sortable: false, value: "picture" },
        { text: "NAME", value: "name" },
        { text: "ID NUMBER", value: "id_num" },
        { text: "DESCRIPTION", sortable: false, value: "description" },
        { text: "UPADETED AT", value: "updatedAt" },
      ],
      patientList: [
        /* {
            patient_id: 2,
            name: "Dimitris",
            surname: "Dallas",
            id_num: "1111",
            age: 23,
            height: "180",
            bloodtype: "B+",
            email: "ddallas@gmail.com",
            description: "femur pain",
            createdAt: "2021-03-31",
            updatedAt: "2021-03-31",
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
        }*/
      ],
    };
  },
  methods: {
    getPatients() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      // console.log(inMemoryToken)
      this.$store
        .dispatch("getPatients", inMemoryToken)
        .then((response) => {
          console.log(response);

          this.patientList = response.data.message;
        })
        .catch((error) => {
          console.log("profile error");
          console.log(error);
        });
    },
  },
  mounted() {
    this.getPatients();
  },
};
</script>

<style>
</style>
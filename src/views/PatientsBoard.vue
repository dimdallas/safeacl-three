<template>
  <v-main class="fill-height">
    <side-nav />
    <v-row class="fill-height corrected">
      <v-col>
        <!-- <v-container fluid ma-0 pa-0 fill-height> -->
        <v-window
          :value="step"
          class="fill-height"
        >
          <v-window-item :value="1" class="fill-height">
            <v-card
              height="90%"
              width="100%"
              class="d-flex flex-column teal lighten-3 mx-auto"
            >
              <v-container fill-height>
                <v-row justify="center" align="center">
                  <v-col
                    v-for="patientCard in displayList"
                    :key="patientCard.id_num"
                    cols="4"
                  >
                    <patient-card
                      :patient="patientCard"
                      @parentFunc="displayProfileEvent"
                    />
                  </v-col>
                </v-row>
              </v-container>

              <v-row justify="center" align="center">
                <v-btn
                  dark
                  class="teal darken-3"
                  @click.stop="createDialog = true"
                  >Καινουριος Ασθενης</v-btn
                >
              </v-row>
              <v-card-actions>
                <v-icon @click="prevPage">mdi-arrow-left</v-icon>
                <v-spacer></v-spacer>
                <v-card-text class="text-center">{{ page }}</v-card-text>
                <v-spacer></v-spacer>
                <v-icon @click="nextPage">mdi-arrow-right</v-icon>
              </v-card-actions>
            </v-card>
          </v-window-item>
          <v-window-item :value="2" class="fill-height">
            <patient-profile
              :patient="profilePatient"
              @parentFunc="hideProfile"
            />
          </v-window-item>
        </v-window>
        <!-- </v-container> -->
      </v-col>
    </v-row>

    <v-dialog v-model="createDialog" max-width="40%">
      <v-form @submit.prevent="createPatient">
        <v-card class="teal mx-auto">
          <v-card-title class="white--text">Στοιχεία Ασθενή</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-card-text>
                  <v-text-field
                    dark
                    v-model="newPatient.name"
                    label="First name"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.surname"
                    label="Last name"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.id_num"
                    label="ID number"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.email"
                    label="email"
                    prepend-icon="mdi-email"
                  />
                  <v-file-input
                    dark
                    v-model="newPatient.image"
                    label="Picture"
                    prepend-icon="mdi-file-image"
                  />
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-text>
                  <v-text-field
                    dark
                    v-model="newPatient.age"
                    label="age"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.height"
                    label="height"
                    prepend-icon="mdi-human-male-height-variant"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.weight"
                    label="weight"
                    prepend-icon="mdi-weight-kilogram"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.bloodtype"
                    label="bloodtype"
                    prepend-icon="mdi-water"
                  />
                  <v-text-field
                    dark
                    v-model="newPatient.description"
                    label="Describe situation"
                    prepend-icon="mdi-card-text
              "
                  />
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
          <v-card-text> </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn dark color="teal darken-3" class="mx-auto" type="submit"
              >Δημιουργία</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import PatientCard from "../components/PatientCard.vue";
import PatientProfile from "../components/PatientProfile";
import BackEndApi from "../services/api/backEnd";

export default {
  components: {
    SideNav,
    PatientCard,
    PatientProfile,
  },
  name: "PatientsBoard",
  data() {
    return {
      page: 1,
      perPage: 2,
      maxPages: 0,
      maxItems: 0,
      displayList: [],
      patientList: [],
      profilePatient: {},
      newPatient: {
        name: null,
        surname: null,
        id_num: null,
        email: null,
        age: null,
        height: null,
        weight: null,
        bloodtype: null,
        description: null,
        image: File,
      },
      createDialog: false,
      createdDialog: false,
      updateDialog: false,
      updatedDialog: false,
      deleteDialog: false,
      deletedDialog: false,
      step: 1,
    };
  },
  methods: {
    getPatients() {
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
      // console.log(headers)
      BackEndApi.getCalls("/patients", config)
        .then((response) => {
          this.patientList = response.data.message;

          //TO BE DELETED
          this.profilePatient = this.patientList[0];

          this.maxItems = this.patientList.length;

          if (this.maxItems % this.perPage == 0) {
            this.maxPages = this.patientList.length / this.perPage;
          } else {
            this.maxPages = this.patientList.length / this.perPage + 1;
          }

          var minSlice = Math.min(this.perPage, this.maxItems);
          this.displayList = this.patientList.slice(0, minSlice);
        })
        .catch((error) => {
          console.log("getPatients error");
          console.log(error.response.data.message);
        });
    },
    createPatient() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      let payload = new FormData();
      payload.append("name", this.newPatient.name);
      payload.append("surname", this.newPatient.surname);
      payload.append("id_num", this.newPatient.id_num);
      payload.append("email", this.newPatient.email);
      payload.append("age", this.newPatient.age);
      payload.append("height", this.newPatient.height);
      payload.append("weight", this.newPatient.weight);
      payload.append("bloodtype", this.newPatient.bloodtype);
      payload.append("description", this.newPatient.description);
      payload.append("image", this.newPatient.image);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: inMemoryToken,
      };

      BackEndApi.postCalls("/patients", payload, { headers })
        .then((response) => {
          console.log(response);
          this.getPatients();
          this.createDialog = false;
          this.createdDialog = true;
        })
        .catch((error) => {
          console.log("create error");
          console.log(error);
        });
    },
    nextPage() {
      // console.log(this.maxPages);
      if (this.page == this.maxPages) {
        return;
      } else if (this.page == this.maxPages - 1) {
        this.page++;
        this.displayList = this.patientList.slice(
          (this.page - 1) * this.perPage,
          this.maxItems
        );
      } else {
        this.page++;
        this.displayList = this.patientList.slice(
          this.page - 1,
          this.page * this.perPage
        );
      }
    },
    prevPage() {
      if (this.page == 1) {
        return;
      } else if (this.page == this.maxPages - 1) {
        this.page--;
        this.displayList = this.patientList.slice(
          (this.page - 1) * this.perPage,
          this.maxItems
        );
      } else {
        this.page--;
        this.displayList = this.patientList.slice(
          this.page - 1,
          this.page * this.perPage
        );
      }
    },
    displayProfileEvent(valueFromChild) {
      // console.log("from child " + valueFromChild);
      this.displayList.forEach((patient) => {
        if (patient.patient_id == valueFromChild) {
          this.profilePatient = patient;
        }
      });

      // console.log(this.profilePatient)
      this.step++;
    },
    hideProfile() {
      // console.log("from profile ");
      this.step--;
    },
  },
  mounted() {
    this.getPatients();
  },
};
</script>

<style>
.v-window-class {
  height: 100%;
}
</style>
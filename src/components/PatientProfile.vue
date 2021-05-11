<template>
  <v-card
    height="90%"
    width="100%"
    class="d-flex flex-column teal lighten-3 mx-auto"
  >
    <v-card-actions>
      <v-icon @click="childFuncHide">mdi-arrow-left</v-icon>
    </v-card-actions>
    <v-container fill-height>
      <v-row justify="center" align="start">
        <v-col align-self="start">
          <v-card width="50%" class="mx-auto" elevation="0">
            <v-card-title
              >{{ patient.name }} {{ patient.surname }}</v-card-title
            >
            <v-card-subtitle>Εισήχθη στις {{ this.createdAt }}</v-card-subtitle>
            <v-divider></v-divider>
            <v-img max-height="250" :src="this.image" />
          </v-card>
          <v-list width="60%" class="mx-auto" color="transparent">
            <v-list-item>
              <v-btn text> Προσομοιωση 1 </v-btn>
              <v-spacer></v-spacer>
              <v-card-text class="text-right"> 21/04/2021 </v-card-text>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-btn text> Προσομοιωση 2 </v-btn>
              <v-spacer></v-spacer>
              <v-card-text class="text-right"> 25/04/2021 </v-card-text>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-btn text> Προσομοιωση 3 </v-btn>
              <v-spacer></v-spacer>
              <v-card-text class="text-right"> 30/04/2021 </v-card-text>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <v-container fill-height>
            <v-row justify="center" align="end">
              <v-btn dark class="teal darken-3">Καινουρια Προσομοiωση</v-btn>
            </v-row>
          </v-container>
        </v-col>
        <v-col align-self="start">
          <v-container fill-height class="d-flex flex-column">
            <v-list width="60%" class="mx-auto fill-height" color="transparent">
              <v-subheader class="black--text">Στοιχεία</v-subheader>
              <v-list-item>
                <v-list-item-title>Αριθμός ταυτότητας</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right">{{
                  this.patient.id_num
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>E-mail</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right">{{
                  this.patient.email
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>

            <v-list width="60%" class="mx-auto fill-height" color="transparent">
              <v-subheader class="black--text"
                >Ιατρικές Πληροφορίες</v-subheader
              >
              <v-list-item>
                <v-list-item-title>Ομάδα αίματος</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right">{{
                  this.patient.bloodtype
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Ηλικία</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right"
                  >{{ this.patient.age }} χρονών</v-list-item-subtitle
                >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Ύψος</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right"
                  >{{ this.patient.height }} cm</v-list-item-subtitle
                >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Βάρος</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right"
                  >{{ this.patient.weight }} kg</v-list-item-subtitle
                >
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Περιγραφή</v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="text-right">{{
                  this.patient.description
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
          </v-container>
          <v-container fill-height>
            <v-row justify="center" align="end">
              <v-btn
                dark
                class="teal darken-3"
                @click.stop="updateDialog = true"
                >Ενημερωση προφιλ</v-btn
              >
            </v-row>
            <v-row justify="center" align="end">
              <v-btn
                dark
                class="teal darken-3"
                @click.stop="deleteDialog = true"
                >Διαγραφη Ασθενη</v-btn
              >
            </v-row>
            <!-- <v-row justify="center" align="end">
              <v-btn dark class="teal darken-3">Διαγραφή ασθενή</v-btn>
            </v-row> -->
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="updateDialog" max-width="40%">
      <v-form @submit.prevent="updateProfile">
        <v-card class="teal mx-auto">
          <v-card-title class="white--text">Στοιχεία Ασθενή</v-card-title>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-card-text>
                  <v-text-field
                    dark
                    v-model="updateData.name"
                    label="First name"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.surname"
                    label="Last name"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    disabled
                    dark
                    v-model="updateData.id_num"
                    label="ID number"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    disabled
                    dark
                    v-model="updateData.email"
                    label="email"
                    prepend-icon="mdi-email"
                  />
                  <v-file-input
                    dark
                    v-model="updateData.image"
                    label="Picture"
                    prepend-icon="mdi-file-image"
                  />
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-text>
                  <v-text-field
                    dark
                    v-model="updateData.age"
                    label="age"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.height"
                    label="height"
                    prepend-icon="mdi-human-male-height-variant"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.weight"
                    label="weight"
                    prepend-icon="mdi-weight-kilogram"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.bloodtype"
                    label="bloodtype"
                    prepend-icon="mdi-water"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.description"
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
              >Ενημέρωση</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="40%">
      <v-form @submit.prevent="deleteProfile">
        <v-card class="teal mx-auto">
          <v-card-title class="white--text">Επιβεβαιώνετε την διαγραφή;</v-card-title>
          <v-card-actions>
            <v-btn dark color="teal darken-3" class="mx-auto" type="submit"
              >Ναι</v-btn
            >
            <v-btn dark color="teal darken-3" class="mx-auto" @click="deleteDialog=false"
              >Οχι</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="deletedDialog" max-width="40%">
      <v-form @submit.prevent="childFuncDelete">
        <v-card class="teal mx-auto">
          <v-card-title class="white--text">Ασθενής διεγράφη</v-card-title>
          <v-card-actions>
            <v-btn dark color="teal darken-3" class="mx-auto" type="submit"
              >ΟΚ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-card>
</template>

<script>
import BackEndApi from "../services/api/backEnd";
import def_image from "/public/img6.png";

function formatDate(fetchedInfo) {
  let day;
  let month;
  let year;
  // let hour;
  // let minutes;
  // let seconds;

  let date = fetchedInfo.split("T")[0].split("-");
  // let time = fetchedInfo.split('T')[1].split('.')[0];

  day = date[2];
  month = date[1];
  year = date[0];

  let formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}

export default {
  name: "PatientProfile",
  props: {
    patient: Object,
  },
  data() {
    return {
      image: def_image,
      createdAt: "DD/MM/YYYY",
      updateDialog: false,
      updatedDialog: false,
      deleteDialog: false,
      deletedDialog: false,
      updateData: {
        name: "",
        surname: "",
        age: "",
        height: "",
        weight: "",
        bloodtype: "",
        description: "",
        image: File,
      },
    };
  },
  methods: {
    childFuncHide() {
      this.updateDialog = false;
      this.updatedDialog = false;
      this.deleteDialog = false;
      this.deletedDialog = false;
      this.$emit("parentFuncHide");
    },
    childFuncDelete() {
      this.updateDialog = false;
      this.updatedDialog = false;
      this.deleteDialog = false;
      this.deletedDialog = false;
    },
    getProfile() {
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

      BackEndApi.getCalls("/patients/" + this.patient.patient_id, config)
        .then((response) => {
          this.patient = response.data.doctor;

          // if (this.patient.image != null) {
          //   console.log("one")
          //   this.image = "http://10.64.92.213:8883/" + this.patient.image;
          // }
        })
        .catch((error) => {
          console.log("getProfile error");
          console.log(error.response.data.message);
          // localStorage.removeItem("token")
          // this.$store.dispatch("deleteToken").then(() => {
          //   console.log("removed old token");
          // });
          // this.$router.push("/authentication");
        });
    },
    updateProfile() {
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      let payload = new FormData();
      payload.append("name", this.updateData.name);
      payload.append("surname", this.updateData.surname);
      payload.append("age", this.updateData.age);
      payload.append("height", this.updateData.height);
      payload.append("weight", this.updateData.weight);
      payload.append("bloodtype", this.updateData.bloodtype);
      payload.append("description", this.updateData.description);
      payload.append("image", this.updateData.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: inMemoryToken,
        },
      };

      BackEndApi.putCalls(
        "/patients/" + this.patient.patient_id,
        payload,
        config
      )
        .then((response) => {
          console.log("update success" + response.data.message);
          this.getProfile();

          this.updateDialog = false;
          // this.updatedDialog = true;
        })
        .catch((error) => {
          console.log("updateProfile error");
          console.log(error.response.data.message);
          // localStorage.removeItem("token")
          // this.$store.dispatch("deleteToken").then(() => {
          //   console.log("removed old token");
          // });
          // this.$router.push("/authentication");
        });
    },
    deleteProfile(){
      const inMemoryToken = localStorage.getItem("token");
      if (inMemoryToken == null) {
        this.$router.push("/authentication");
        return;
      }

      const config = {
        headers: {
          Authorization: inMemoryToken,
        },
      };

      BackEndApi.deleteCalls(
        "/patients/" + this.patient.patient_id,
        config
      )
        .then((response) => {
          console.log("delete success" + response.data.message);

          this.deleteDialog = false;
          this.deletedDialog = true;
          this.$emit("parentFuncDelete");
        })
        .catch((error) => {
          console.log("updateProfile error");
          console.log(error.response.data.message);
          // localStorage.removeItem("token")
          // this.$store.dispatch("deleteToken").then(() => {
          //   console.log("removed old token");
          // });
          // this.$router.push("/authentication");
        });
    }
  },
  // beforeCreate() {
  //   console.log("1 beforeCreate");
  // },
  // created() {
  //   console.log("2 created");
  // },
  beforeMount() {
    // console.log("3 beforeMount");
    if(this.patient.image != null){
      this.image = "http://10.64.92.213:8883/" + this.patient.image;
    }
    else{
      this.image = def_image
    }

    // console.log(this.patient)
    this.createdAt = formatDate(this.patient.createdAt);

    this.updateData.name = this.patient.name;
    this.updateData.surname = this.patient.surname;
    this.updateData.name = this.patient.id_num;
    this.updateData.surname = this.patient.email;
    this.updateData.age = this.patient.age;
    this.updateData.height = this.patient.height;
    this.updateData.weight = this.patient.weight;
    this.updateData.bloodtype = this.patient.bloodtype;
    this.updateData.description = this.patient.description;
    // this.updateData.image = File;
  },
  // mounted() {
  //   console.log("4 mounted");
  // },
  beforeUpdate() {
    // console.log("5 beforeUpdate");
    // console.log("two");
    if(this.patient.image != null){
      this.image = "http://10.64.92.213:8883/" + this.patient.image;
    }
    else{
      this.image = def_image
    }

    this.createdAt = formatDate(this.patient.createdAt);

    this.updateData.name = this.patient.name;
    this.updateData.surname = this.patient.surname;
    this.updateData.name = this.patient.id_num;
    this.updateData.surname = this.patient.email;
    this.updateData.age = this.patient.age;
    this.updateData.height = this.patient.height;
    this.updateData.weight = this.patient.weight;
    this.updateData.bloodtype = this.patient.bloodtype;
    this.updateData.description = this.patient.description;
    // this.updateData.image = File;
  },
  // updated() {
  //   console.log("6 updated");
  // },
  // activated() {
  //   console.log("7 activated");
  // },
  // deactivated() {
  //   console.log("8 deactivated");
  // },
  // beforeDestroy() {
  //   console.log("11 beforeDestroy");
  // },
  // destroyed() {
  //   console.log("12 destroyed");
  // },
  // errorCapture() {
  //   console.log("13 errorCapture");
  // },
  // renderTracked({ key, target, type }) {
  //   console.log("14 renderTracked");
  //   console.log({ key, target, type });
  // },
  // renderTriggered({ key, target, type }) {
  //   console.log("15 renderTriggered");
  //   console.log({ key, target, type });
  // },
};
</script>

<style>
</style>
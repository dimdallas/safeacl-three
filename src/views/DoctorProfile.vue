<template>
  <v-main class="fill-height">
    <v-card
      max-width="55%"
      class="d-flex flex-column teal lighten-3 mx-auto"
    >
      <v-row>
        <v-col>
          <v-img
            class="mx-auto"
            :src="require('/public/hospital_green.jpg')"
          >
            <v-row class="fill-height">
              <v-col align-self="end">
                <v-avatar size="200" class="ml-10">
                  <v-img :src="this.image"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
          </v-img>
        </v-col>
      </v-row>
      <!-- <v-row justify="end">
        <v-col align-self="end" cols="1">
          <v-card-actions @click.stop="settingsDialog = true">
            <v-icon>fas fa-bars</v-icon>
          </v-card-actions>
        </v-col>
      </v-row> -->

      <v-row class="fill-height">
        <v-col>
          <v-list color="rgba(0, 0, 0, .0)">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">{{
                  info.name + " " + info.surname
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  info.speciality
                }}</v-list-item-subtitle>
                <v-divider></v-divider>
                <v-list-item-content>
                  <!-- <v-icon left>email</v-icon> -->
                  <v-list-item-title>{{ info.email }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <!-- <v-icon left>phone</v-icon> -->
                  <v-list-item-title>{{ info.phone }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <!-- <v-icon left>home</v-icon> -->
                  <v-list-item-title>{{ info.address }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-list-item>
            <v-list-item-content>{{ this.description }}</v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col align-self="start" cols="1">
          <v-card-actions @click.stop="settingsDialog = true">
            <v-icon>fas fa-user-cog</v-icon>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="settingsDialog" max-width="30%">
      <v-form @submit.prevent="updateProfile">
        <v-card class="teal mx-auto">
          <v-card-title class="white--text">Ενημέρωση προφίλ</v-card-title>
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
                    dark
                    v-model="updateData.address"
                    label="Address"
                    prepend-icon="mdi-home"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.phone"
                    label="Phone number"
                    prepend-icon="mdi-phone"
                  />
                  <v-text-field
                    dark
                    v-model="updateData.speciality"
                    label="Medical Speciality"
                    prepend-icon="mdi-card-text"
                  />
                  <v-file-input
                    dark
                    v-model="updateData.image"
                    label="Picture"
                    prepend-icon="mdi-file-image"
                  />
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
          <v-card-text> </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn dark color="teal darken-3" class="mx-auto" type="submit"
              >Update</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="updatedDialog" max-width="15%">
      <v-card class="teal mx-auto">
        <v-card-title class="white--text justify-center"
          >Profile updated!</v-card-title
        >
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import BackEndApi from "../services/api/backEnd";
import def_image from "/public/img6.png";

export default {
  name: "DoctorProfile",
  data() {
    return {
      settingsDialog: false,
      updatedDialog: false,
      failedDialog: false,
      updateData: {
        name: "",
        surname: "",
        phone: "",
        address: "",
        speciality: "",
        image: File,
      },
      image: def_image,
      description:
        "This is the description of the doctor. Here You can write whatever you want other doctors to see, or maybe a personal quote.",
      info: {},
      /* user:
            address: "Nitlan"
            email: "test1@email.gr"
            name: "member"
            password: 
            phone: "6931231323"
            speciality: "Doctor"
            surname: "member"
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
            username: "member"
            image: "Endpoint/image"
      */
    };
  },
  methods: {
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

      BackEndApi.getCalls("/users/profile", config)
        .then((response) => {
          this.info = response.data.user;

          this.updateData.name = this.info.name;
          this.updateData.surname = this.info.surname;
          this.updateData.phone = this.info.phone;
          this.updateData.address = this.info.address;
          this.updateData.speciality = this.info.speciality;

          if (this.info.image != null) {
            this.image = "http://10.64.92.213:8883/" + this.info.image;
          }
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
      payload.append("phone", this.updateData.phone);
      payload.append("address", this.updateData.address);
      payload.append("speciality", this.updateData.speciality);
      payload.append("image", this.updateData.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: inMemoryToken,
        },
      };

      BackEndApi.putCalls("/users/update", payload, config)
        .then((response) => {
          console.log("update success" + response.data.message);
          this.getProfile();

          this.settingsDialog = false;
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
  },
  beforeMount() {
    this.getProfile();
  },
};
</script>

<style>
.corrected {
  position: relative;
  right: 120px;
}
</style>
<template>
  <v-main class="fill-height">
    <v-card max-height="95%" max-width="700" elevation="0" class="transparent mx-auto">
      <v-row justify="center" align="start">
        <v-col>
          <v-container>
            <v-window v-model="step">
              <!-- LOGIN WINDOW -->
              <v-window-item :value="1">
                <v-form @submit.prevent="login">
                  <v-card width="70%" class="teal mx-auto">
                    <v-card-title class="white--text">LOGIN</v-card-title>
                    <v-card-text>
                      <v-text-field
                        dark
                        v-model="input.email"
                        label="Email"
                        prepend-icon="mdi-email-outline"
                      />
                      <v-text-field
                        dark
                        v-model="input.password"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                      />
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn dark color="teal darken-3 mx-auto" type="submit"
                        >Login</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-window-item>

              <!-- SIGN UP WINDOW -->
              <v-window-item :value="2">
                <v-form @submit.prevent="register">
                  <v-card
                    max-height="600px"
                    width="100%"
                    class="teal mx-auto"
                    @submit.prevent="register"
                  >
                    <v-card-title class="white--text">SIGN UP</v-card-title>
                    <v-row>
                      <v-col>
                        <v-card-text>
                          <v-text-field
                            dark
                            v-model="credData.name"
                            label="First name"
                            prepend-icon="mdi-account"
                          /><v-text-field
                            dark
                            v-model="credData.surname"
                            label="Last name"
                            prepend-icon="mdi-account"
                          />
                          <v-text-field
                            dark
                            v-model="credData.username"
                            label="Username"
                            prepend-icon="mdi-account-box"
                          />
                          <!-- <v-file-input
                            dark
                            v-model="credData.image"
                            label="Picture"
                            prepend-icon="mdi-file-image"
                          /> -->
                        </v-card-text>
                      </v-col>
                      <v-col>
                        <v-card-text>
                          <v-text-field
                            dark
                            v-model="credData.address"
                            label="Address"
                            prepend-icon="mdi-home"
                          />
                          <v-text-field
                            dark
                            v-model="credData.phone"
                            label="Phone number"
                            prepend-icon="mdi-phone"
                          />
                          <v-text-field
                            dark
                            v-model="credData.speciality"
                            label="Medical Speciality"
                            prepend-icon="mdi-hospital-box"
                          />
                        </v-card-text>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col>
                        <v-card-text>
                          <v-text-field
                            dark
                            v-model="credData.email"
                            label="Email"
                            prepend-icon="mdi-email"
                          />
                        </v-card-text>
                      </v-col>
                      <v-col>
                        <v-card-text>
                          <v-text-field
                            dark
                            v-model="credData.password"
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            :append-icon="
                              showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="showPassword = !showPassword"
                          />
                        </v-card-text>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn dark color="teal darken-3 mx-auto" type="submit"
                        >Register</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-window-item>
            </v-window>
          </v-container>
        </v-col>
      </v-row>

      <v-row justify="center" align="end">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-form width="500" class="ma-0 teal darken-3 mx-auto">
              <v-card-title class="white--text"
                >Not a registered user?</v-card-title
              >
              <v-card-actions>
                <v-btn dark color="teal mx-auto" @click="step++">Sign Up</v-btn>
              </v-card-actions>
            </v-form>
          </v-window-item>
          <v-window-item :value="2">
            <v-form width="500" class="ma-0 teal darken-3 mx-auto">
              <v-card-title class="white--text"
                >Already a registered user?</v-card-title
              >
              <v-card-actions>
                <v-btn dark color="teal mx-auto" @click="step--">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-window-item>
        </v-window>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import router from "@/router/index";
import store from "@/store/index";
import BackEndApi from "../services/api/backEnd.js";

export default {
  name: "Auth",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      credData: {
        name: "",
        surname: "",
        phone: "",
        address: "",
        speciality: "",
        username: "",
        email: "",
        password: "",
        // image: File,
      },
      showPassword: false,
      loading: false,
      step: 1,
    };
  },
  props: {
    source: String,
  },
  methods: {
    login() {
      // console.log("identifier" + this.input.identifier);
      // console.log("pass", this.input.password);
      this.loading = true;

      store
        .dispatch("retrieveToken", {
          email: this.input.email,
          password: this.input.password,
        })
        .then((success) => {
          console.log("loging in  " + success);

          // var token = localStorage.getItem("access_token");
          // var userId = localStorage.getItem("user_id");
          this.loading = false;
          router.push("/overview");
        })
        .catch((error) => {
          this.loading = false;
          console.log("login error");
          console.log(error.response.data.message);
        });
    },
    register() {
      this.loading = true;

      // let payload = new FormData();
      // payload.append("name", this.credData.name);
      // payload.append("surname", this.credData.surname);
      // payload.append("phone", this.credData.phone);
      // payload.append("address", this.credData.address);
      // payload.append("speciality", this.credData.speciality);
      // payload.append("username", this.credData.username);
      // payload.append("email", this.credData.email);
      // payload.append("password", this.credData.password);
      // payload.append("image", this.credData.image);

      let payload = this.credData;

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      BackEndApi.postCalls("/auth/register", payload, config)
        .then((response) => {
          console.log("register  " + response);

          // var token = localStorage.getItem("access_token");
          // var userId = localStorage.getItem("user_id");
          this.loading = false;
          this.step--;
        })
        .catch((error) => {
          this.loading = false;
          console.log("register error");
          console.log(error.response.data.message);
        });
    },
  },
};
</script>

<style>
@import "../styles/form.css";
</style>
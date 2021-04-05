<template>
  <v-main class="form-signin">
    <v-window v-model="step">
      <!-- LOGIN WINDOW -->
      <v-window-item :value="1">
        <v-form width="500" class="teal mx-auto" @submit.prevent="login">
          <v-card-title class="white--text">Login</v-card-title>
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
            <v-btn dark color="teal darken-3" type="submit">Login</v-btn>
          </v-card-actions>
        </v-form>
        <v-form width="500" class="ma-10 teal darken-3 mx-auto">
          <v-card-title class="white--text"
            >Not a registered user?</v-card-title
          >
          <v-card-actions>
            <v-btn dark color="teal" @click="step++">Sign Up</v-btn>
          </v-card-actions>
        </v-form>
      </v-window-item>

      <!-- SIGN UP WINDOW -->
      <v-window-item :value="2">
        <v-form width="500" class="teal mx-auto" @submit.prevent="register">
          <v-card-title class="white--text">Sign Up</v-card-title>
          <v-card-text>
            <v-text-field
              dark
              v-model="credData.name"
              label="First name"
              prepend-icon="mdi-account"
            />
            <v-text-field
              dark
              v-model="credData.surname"
              label="Last name"
              prepend-icon="mdi-account"
            />
            <v-text-field
              dark
              v-model="credData.phone"
              label="Phone number"
              prepend-icon="mdi-phone"
            />
            <v-text-field
              dark
              v-model="credData.address"
              label="Address"
              prepend-icon="mdi-home"
            />
            <v-text-field
              dark
              v-model="credData.speciality"
              label="Medical Speciality"
              prepend-icon="mdi-hospital-box"
            />
            <v-text-field
              dark
              v-model="credData.username"
              label="Username"
              prepend-icon="mdi-account-box"
            />
            <v-text-field
              dark
              v-model="credData.email"
              label="Email"
              prepend-icon="mdi-email"
            />
            <v-text-field
              dark
              v-model="credData.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn dark color="teal darken-3" type="submit">Register</v-btn>
          </v-card-actions>
        </v-form>
        <v-form width="500" class="ma-10 teal darken-3 mx-auto">
          <v-card-title class="white--text"
            >Already a registered user?</v-card-title
          >
          <v-card-actions>
            <v-btn dark color="teal" @click="step--">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-window-item>
    </v-window>
  </v-main>
</template>

<script>
import router from "@/router/index";
import store from "@/store/index";

export default {
  name: "Login",
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
          console.log("login  " + success);

          // var token = localStorage.getItem("access_token");
          // var userId = localStorage.getItem("user_id");
          this.loading = false;
          router.push("/overview");
        })
        .catch((error) => {
          this.loading = false;
          console.log("login error");
          console.log(error);
        });
    },
    register() {
      this.loading = true;

      store
        .dispatch("registerUser", {
          name: this.credData.name,
          surname: this.credData.surname,
          phone: this.credData.phone,
          address: this.credData.address,
          speciality: this.credData.speciality,
          username: this.credData.username,
          email: this.credData.email,
          password: this.credData.password,
        })
        .then((success) => {
          console.log("register  " + success);

          // var token = localStorage.getItem("access_token");
          // var userId = localStorage.getItem("user_id");
          this.loading = false;
          this.step--
        })
        .catch((error) => {
          this.loading = false;
          console.log("login error");
          console.log(error);
        });
    },
  },
};
</script>

<style>
@import "../styles/form.css";
</style>
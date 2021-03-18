<template>
  <v-main class="form-signin">
    <v-form width="500" class="teal mx-auto" @submit.prevent="register">
      <v-card-title class="white--text">Sign Up</v-card-title>
      <v-card-text>
        
        <v-text-field
            dark
            v-model="credData.username"
            label="Username"
            prepend-icon="mdi-account-circle"/>
        <v-text-field
            dark
            v-model="credData.email"
            label="Email"
            prepend-icon="mdi-email-outline"/>
        <v-text-field
            dark
            v-model="credData.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword =! showPassword"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn dark color="teal darken-3" type="submit">Register</v-btn>
      </v-card-actions>

    </v-form>
  </v-main>
</template>

<script>
import router from "@/router/index";

export default {
  name: "Signup",
  data(){
    return{
      credData: {
        username: '',
        email: '',
        password: ''
      },
      showPassword:false
    }
  },
  methods: {
    async register () {
      try {
        const response = await fetch('http://localhost:5001/auth/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.credData)
        })/*.then(res => res.json())
            .then( res => {
              // console.log(res);
              // const inMemoryToken = res.token;
              // console.log(inMemoryToken)
              localStorage.setItem('user', JSON.stringify(res));
              // 'user' is the generic key to store in LocalStorage. You could use any name you want
              // Store complete object, so you will be able to access 'user' and 'token' later

              router.push('/')
            });*/
        const status = response.status
        if(status !=200){
          return
        }

        const content = await response.json()
        localStorage.setItem('user', JSON.stringify(content))
        router.push('/')
      
      }catch (e) {
        console.log(e)
        // await router.push('/signup')
      }
      
    }
  }
}
</script>

<style>
@import "../styles/form.css";
</style>
<template>
  <v-main class="form-signin">
    <v-form width="500" class="teal mx-auto" @submit.prevent="login">
      <v-card-title class="white--text">Login</v-card-title>
      <v-card-text>
        <v-text-field
            dark
            v-model="input.email"
            label="Email"
            prepend-icon="mdi-email-outline"/>
        <v-text-field
            dark
            v-model="input.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword =! showPassword"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn dark color="teal darken-3" type="submit">Login</v-btn>
      </v-card-actions>

    </v-form>
  </v-main>
</template>

<script>
import router from "@/router/index";

export default {
  name: "Login",
  data(){
    return{
      input: {
        email: '',
        password: ''
      },
      showPassword:false
    }
  },
  methods: {
    async login() {
      try {
        console.log(JSON.stringify(this.input))
        const response = await fetch('http://localhost:5001/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.input)
        })/*.then( res => {
            // console.log(res)
            if(res.status != 200)
              return
            // console.log(res);
            // const inMemoryToken = res.token;
            // console.log(inMemoryToken)
            localStorage.setItem('user', JSON.stringify(res.json()));
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

        
      }catch (e){
        console.log(e)
        // await router.push('/login')
      }
    }
  }
}
</script>

<style>
@import "../styles/form.css";
</style>